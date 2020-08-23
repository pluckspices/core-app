const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Commodity = require("../../models/commodity");
const Auction = require("../../models/auction");
const UniqueId = require("../../models/uniqueId");

exports.createItem = (req, res, next) => {
  const reqbody = req.body.data;
  const memberId = reqbody.memberId;
  const poolCategory = reqbody.poolCategory;
  const quantity = reqbody.quantity;
  const collectionCentre = reqbody.collectionCentre;
  const grade = reqbody.grade;
  const litreWeight = reqbody.litreWeight;
  const auctionId = reqbody.auctionId;
  const lotNo = reqbody.lotNo;

  const updateUnoccupiedLots = (auctionId, lotNo) => {
    Auction.findOne({ _id: auctionId }).then((auction) => {
      if (auction) {
        let unoccupiedLots = auction.unoccupiedLots;
        const index = unoccupiedLots.indexOf(lotNo);
        if (index > -1) {
          unoccupiedLots.splice(index, 1);
        }
        auction.unoccupiedLots = unoccupiedLots;
        auction.save();
      }
    });
  };

  UniqueId.findOneAndUpdate(
    { seqName: "transactionNo" },
    { $inc: { seqValue: 1 } }
  )
    .then((result) => {
      if (poolCategory === 27) {
        Commodity.findOne({ auction: auctionId, lotNo: lotNo })
          .then((item) => {
            if (item) {
              const error = new Error("An item is already exists for the lot.");
              error.details = { lotNo: lotNo };
              error.statusCode = 409;
              throw error;
            }
            const ItemPooling = new Commodity({
              transactionNo: result.seqValue,
              member: memberId,
              poolCategory: poolCategory,
              quantity: quantity,
              collectionCentre: collectionCentre,
              litreWeight: litreWeight,
              grade: grade,
              auction: auctionId,
              lotNo: lotNo,
            });
            return ItemPooling.save();
          })
          .then((result) => {
            if (result.auction) {
              updateUnoccupiedLots(result.auction, lotNo);
            }
            res.status(201).send({ message: "New item pooled sucessfully!" });
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.message = "Internal server error!";
              err.statusCode = 500;
            }
            next(err);
          });
      } else if (poolCategory === 26) {
        const ItemPooling = new Commodity({
          transactionNo: result.seqValue,
          member: memberId,
          poolCategory: poolCategory,
          quantity: quantity,
          collectionCentre: collectionCentre,
          litreWeight: litreWeight,
          grade: grade,
        });
        ItemPooling.save()
          .then((result) => {
            if (result) {
              res.status(201).send({ message: "New item pooled sucessfully!" });
            }
          })
          .catch((err) => {
            if (!err.statusCode) {
              err.message = "Internal server error!";
              err.statusCode = 500;
            }
            next(err);
          });
      } else {
        const error = new Error("Can't pool item.");
        error.statusCode = 406;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.stockList = (req, res, next) => {
  Commodity.aggregate([
    { $match: { poolCategory: 26 } },
    { $sort: { createdOn: -1 } },
    {
      $lookup: {
        from: "member_planter",
        localField: "member",
        foreignField: "_id",
        as: "memberPlanter",
      },
    },
    {
      $lookup: {
        from: "member_dealer",
        localField: "member",
        foreignField: "_id",
        as: "memberDealer",
      },
    },
  ])
    .then((commodities) => {
      if (!commodities) {
        const error = new Error("Could not found Items for Category!");
        error.statusCode = 404;
        throw error;
      }
      let commodityDetails = [];
      commodities.forEach((commodity) => {
        let memberURN;
        let memberName;
        if (commodity.memberPlanter.length > 0) {
          memberName = `${commodity.memberPlanter[0].firstName} ${commodity.memberPlanter[0].lastName}`;
          memberURN = commodity.memberPlanter[0].planterURN;
        } else if (commodity.memberDealer.length > 0) {
          memberName = `${commodity.memberDealer[0].dealerName}`;
          memberURN = commodity.memberDealer[0].dealerURN;
        }

        let commodityObj = {
          _id: commodity._id,
          member: commodity.member,
          quantity: commodity.quantity,
          collectionCentre: commodity.collectionCentre,
          litreWeight: commodity.litreWeight,
          grade: commodity.grade,
          pooledOn: commodity.createdOn,
          memberURN: memberURN,
          memberName: memberName,
        };
        commodityDetails.push(commodityObj);
      });
      res
        .status(200)
        .json({ message: "items fetched.", commodities: commodityDetails });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.searchPoolByAuction = (req, res, next) => {
  const auctionId = req.params.auctionId;
  Commodity.aggregate([
    { $match: { auction: ObjectId(auctionId) } },
    { $sort: { lotNo: 1 } },
    {
      $lookup: {
        from: "member_planter",
        localField: "member",
        foreignField: "_id",
        as: "memberPlanter",
      },
    },
    {
      $lookup: {
        from: "member_dealer",
        localField: "member",
        foreignField: "_id",
        as: "memberDealer",
      },
    },
  ])
    .then((commodities) => {
      if (!commodities) {
        const error = new Error("Could not found Items for Auction!");
        error.statusCode = 404;
        throw error;
      }
      let commodityDetails = [];
      commodities.forEach((commodity) => {
        let memberURN;
        let memberName;
        if (commodity.memberPlanter.length > 0) {
          memberName = `${commodity.memberPlanter[0].firstName} ${commodity.memberPlanter[0].lastName}`;
          memberURN = commodity.memberPlanter[0].planterURN;
        } else if (commodity.memberDealer.length > 0) {
          memberName = `${commodity.memberDealer[0].dealerName}`;
          memberURN = commodity.memberDealer[0].dealerURN;
        }

        let commodityObj = {
          _id: commodity._id,
          member: commodity.member,
          quantity: commodity.quantity,
          collectionCentre: commodity.collectionCentre,
          litreWeight: commodity.litreWeight,
          grade: commodity.grade,
          lotNo: commodity.lotNo,
          pooledOn: commodity.createdOn,
          memberURN: memberURN,
          memberName: memberName,
        };
        commodityDetails.push(commodityObj);
      });
      res
        .status(200)
        .json({ message: "items fetched.", commodities: commodityDetails });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.updatePlanter = (req, res) => {
//   const planterURN = req.params.planterURN;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const crNumber = req.body.crNumber;
//   const phoneNumber = req.body.phoneNumber;
//   const address = req.body.address;

//   Planter.findOne({ planterURN: planterURN })
//     .then((planter) => {
//       if (!planter) {
//         const error = new Error("Could not found Planter!");
//         error.statusCode = 404;
//         error.details = { planterURN: planter.planterURN };
//         throw error;
//       }
//       planter.firstName = firstName;
//       planter.lastName = lastName;
//       planter.crNumber = crNumber;
//       planter.phoneNumber = phoneNumber;
//       planter.address = address;
//       planter.updatedOn = Date.now();
//       return planter.save();
//     })
//     .then((result) => {
//       res.status(200).json({
//         message: "Planter was updated successfully!",
//         planterURN: result.planterURN,
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       if (!err.statusCode) {
//         err.message = "Internal server error!";
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.deletePlanter = (req, res) => {
//   const planterURN = req.params.planterURN;
//   Planter.findOne({ planterURN: planterURN })
//     .then((planter) => {
//       if (!planter) {
//         const error = new Error("Could not found Planter!");
//         error.statusCode = 404;
//         error.details = { planterURN: planter.planterURN };
//         throw error;
//       }
//       return planter.remove();
//     })
//     .then((result) => {
//       res.status(200).json({
//         message: "Planter was deleted successfully!!",
//         planterURN: result.planterURN,
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       if (!err.statusCode) {
//         err.message = "Internal server error!";
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

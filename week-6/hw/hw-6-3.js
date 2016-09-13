db.companies.aggregate([
  { $match: { "founded_year": 2004 }},
  { $project: {
    name: 1,
    _id: 0,
    funding_rounds: 1,
    numFundingRounds: { $size: "$funding_rounds" },
    amtRaised: { $sum: "$funding_rounds.raised_amount"}
  }},
  { $match: { numFundingRounds: { $gte: 5 }}},
  { $project: {
    name: 1,
    _id: 0,
    avgFunding: { $divide: ["$amtRaised", "$numFundingRounds"]}
  }},
  { $sort: {avgFunding: 1}}
]).pretty()
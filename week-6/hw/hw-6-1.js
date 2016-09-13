db.companies.aggregate( [
  { $match: { "relationships.person": { $ne: null } } },
  { $project: { name: 1, relationships: 1, _id: 0 } },
  { $unwind: "$relationships" },
  { $group: {
    _id: "$relationships.person",
    companies: { $addToSet: "$name" }
  } },
  {$match: {"_id.permalink": "eric-di-benedetto" }}, // can change name
  {$project: {
    name: "$_id.first_name",
    answer:{$size: "$companies"}
  }} 
]).pretty()

// {
//     "_id" : ObjectId("50b59cd75bed76f46522c392"),
//     "student_id" : 10,
//     "class_id" : 5,
//     "scores" : [
//         {
//             "type" : "exam",
//             "score" : 69.17634380939022
//         },
//         {
//             "type" : "quiz",
//             "score" : 61.20182926719762
//         },
//         {
//             "type" : "homework",
//             "score" : 73.3293624199466
//         },
//         {
//             "type" : "homework",
//             "score" : 15.206314042622903
//         },
//         {
//             "type" : "homework",
//             "score" : 36.75297723087603
//         },
//         {
//             "type" : "homework",
//             "score" : 64.42913107330241
//         }
//     ]
// }

db.grades.aggregate([
  {$project: {
    student_id: 1,
    class_id: 1,
    scores: { $filter: {
      input: "$scores",
      as: "score",
      cond: { $ne: ["$$score.type", "quiz"] }
    }},
    _id: 0
  }},
  { $unwind: "$scores"},
  { $group: {
    _id: {class: "$class_id"},
    avgScore: {$avg: "$scores.score"}
  } } ,
  { $sort: { avgScore: -1}}
]).pretty()
const { produce } = require("immer");

const originalState = {
  user: {
    id: 1,
    name: "John",
    address: {
      street: "123 Main St",
      city: "Anytown",
      country: "USA",
    },
    hobbies: ["Reading", "Gaming", "Cooking"],
  },
  todos: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
    { id: 3, text: "Deploy to production", completed: true },
  ],
};

//Using spread(..)

// const nextState = {
//   user: {
//     ...originalState.user,
//     name: "Ibrahim",
//     address: {
//       street: "Adeniji Adele Estate, Phase2",
//       city: "Lagos",
//       country: "NG",
//     },
//   },
//   todos: [
//     { ...originalState.todos[0], completed: true },
//     { ...originalState.todos[1], completed: true },
//     { ...originalState.todos[2], completed: false },
//   ],
// };

//Immer

const nextState = produce(originalState, (draft) => {
  draft.user.name = "Ibrahim";
  draft.user.address.street = "Adeniji Adele Estate, Phase2";
  draft.user.address.city = "Lagos";
  draft.user.address.country = "NG";
  draft.todos[0].completed = true;
  draft.todos[1].completed = true;
  draft.todos[2].completed = true;
});


module.exports = nextState
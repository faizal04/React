// function reducer(state, action) {
//   switch (action.type) {
//     case "dataRecieved":
//       return {
//         ...state,
//         questions: action.payload,
//         status: "ready",
//       };
//     case "active":
//       return {
//         ...state,
//         status: "active",
//       };

//     case "datafailed":
//       console.log(action.payload);
//       return {
//         ...state,
//         questions: "failed",
//         status: "error",
//       };
//     case "newAnswer":
//       const answerpoints = state.questions.at(state.index);
//       console.log(state);
//       console.log(answerpoints);
//       return {
//         ...state,
//         answer: +action.payload,
//         points:
//           action.payload === answerpoints.correctOption
//             ? state.points + answerpoints.points
//             : state.points,
//       };
//     case "nextQuestion":
//       return { ...state, index: state.index + 1, answer: null };
//     case "tick":
//       return {
//         ...state,
//         secondRemaining: state.secondRemaining - 1,
//         status: state.secondRemaining === 0 ? "finished" : state.status,
//       };
//     case "finishedScreen":
//       return {
//         ...state,
//         status: "finished",
//         highscore:
//           state.points > state.highscore ? state.points : state.highscore,
//       };
//     case "restart":
//       return {
//         ...initialState,
//         questions: state.questions,
//         status: "ready",
//       };
//     default:
//       throw new Error("unknown error");
//   }
// }
// export default reducer;

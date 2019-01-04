// import React from 'react';
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import * as actions from '../actions/actions';

// class AddComment extends React.Component {
//     state = {
//       comment: {
//       value: '',
//       typed: false
//       }
//     };
//   render () {
//     return (
//       <div className="newComment">
//         <h3>Leave your comment:</h3>
//         <form onSubmit={this.handleSubmit}>

//           <div className="field comment">
//             <div className="control">
//               <input id="comment-input" className="input" type="text" placeholder="Comment" onChange={this.handleChange} />
//             </div>
//           </div>

//           <button className="submitButton" type="submit">
//           Submit
//           </button>
//         </form>
//       </div>
//     );
//   }
  
//   onChange = (field, event) => {
//     event.preventDefault();
//     const newState = Object.assign({}, this.state, {
//       [field]: { 
//         value: event.target.value,
//         typed: true
//       }
//     });
//     this.setState(Object.assign(newState));
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     let data = {comment: this.state.comment.value};
//     this.props.postComment(this.props.article_id, data);
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     postComment: function (id, newComment) {
//       dispatch(actions.addContent(id, newComment));
//     }
//   };
// }

// function mapStateToProps (state) {
//   return {
//     comment: state.comment
//   };
// }

// AddComment.propTypes = {
//   article_id: PropTypes.string.isRequired,
//   postComment: PropTypes.func.isRequired
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AddComment);// import React, { Component } from "react";
// // import "../stylez/Comments.css";
// // import pt from "prop-types";

// // class AddComment extends Component {
// //   state = {
// //     commentBody: ""
// //   };

// //   render() {
// //     return (
// //     <div>
// //           <textarea className="post-comment-box" placeholder="Write your comment here..." cols="50"
// //               rows="5" type="text" value={this.state.commentBody} onChange={this.addCommentText}/><br/>
// //           <button className="select" onClick={() => { 
// //             this.props.addComment(this.props.articleid, this.state.commentBody)
// //               this.setState ({
// //                 commentBody: ''
// //               })
// //             }}>Post My Comment!</button><br/><br/>
// //     </div>);
// //   }

// //   addCommentText = event => {
// //     this.setState({ 
// //       commentBody: event.target.value 
// //     })
// //   };

// // }

// // AddComment.propTypes = {
// //   comments: pt.arrayOf(pt.object)
// // };

// // export default AddComment;
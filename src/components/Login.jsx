// import React, { Component } from "react";
// import '../stylez/App.css'
// import pt from "prop-types";

// class Login extends Component {
//   render() {
//       return (
//         <div>
//           {!this.props.loggedInUser && <div><p className="login">Log In Below:</p><select className="select" onChange={this.props.selectUser}>
//             <option>Select a User</option>
//             {this.props.users.map(user => (
//               <option className="select-options" value={user._id} name={user.name} key={user._id}>
//                 {user.name}
//               </option>)) }</select></div>
//           }
//           {this.props.loggedInUser && <div><p className="logged-in">Logged in as {this.props.loggedInUser}</p>
//           <button className="select" onClick={this.props.logOut}>Log out</button></div>}
//         </div>
//       );
//   }
// }

// Login.propTypes = {
//   logOut: pt.func,
//   loggedInUser: pt.string,
//   selectUser: pt.func,
//   users: pt.arrayOf(pt.object)
// };

// export default Login;
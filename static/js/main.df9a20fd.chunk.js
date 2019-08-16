(window["webpackJsonpmusic-student-management-react-frontend"]=window["webpackJsonpmusic-student-management-react-frontend"]||[]).push([[0],{32:function(e,t,n){e.exports=n(44)},37:function(e,t,n){},42:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(27),s=n.n(l),o=(n(37),n(9)),c=n(10),u=n(12),i=n(11),m=n(13),h=n(16),d=n(15),p=n(50),g=n(45),E=n(17),f="https://music-student-management-api.herokuapp.com",b=n(19),v=f,C=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:"",confirmPassword:"",name:"",instrument:"",location:""},n.handleChange=function(e){n.setState(Object(b.a)({},e.target.id,e.target.value))},n.handleCreateAccount=function(e){e.preventDefault();var t=n.state;t.password!==t.confirmPassword?alert("Passwords do not match, please try again"):fetch(v+"/users",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify({user:{username:n.state.username,password:n.state.password,name:n.state.name,instrument:n.state.instrument,location:n.state.location}})}).then(function(e){return e.json()}).then(function(e){console.log(e)}).then(n.props.history.push("/"))},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Create Account"),r.a.createElement("form",{onSubmit:this.handleCreateAccount},r.a.createElement("label",null,r.a.createElement("input",{type:"text",id:"username",name:"username",onChange:this.handleChange,value:this.state.username,placeholder:"Username"})),r.a.createElement("br",null),r.a.createElement("label",null,r.a.createElement("input",{type:"password",id:"password",name:"password",onChange:this.handleChange,value:this.state.password,placeholder:"Password"})),r.a.createElement("br",null),r.a.createElement("label",null,r.a.createElement("input",{type:"password",id:"confirmPassword",name:"confirmPassword",onChange:this.handleChange,value:this.state.confirmPassword,placeholder:"Confirm Password"})),r.a.createElement("br",null),r.a.createElement("label",null,r.a.createElement("input",{type:"text",id:"name",name:"name",onChange:this.handleChange,value:this.state.name,placeholder:"Name"})),r.a.createElement("br",null),r.a.createElement("label",null,"Instrument:",r.a.createElement("select",{id:"instrument",value:this.state.instrument,onChange:this.handleChange},r.a.createElement("option",{value:""}),r.a.createElement("option",{value:"guitar"},"Guitar"),r.a.createElement("option",{value:"bass"},"Bass"),r.a.createElement("option",{value:"drums"},"Drums"),r.a.createElement("option",{value:"piano"},"Piano"))),r.a.createElement("br",null),r.a.createElement("label",null,"Location:",r.a.createElement("select",{id:"location",value:this.state.location,onChange:this.handleChange},r.a.createElement("option",{value:""}),r.a.createElement("option",{value:"altus"},"Altus"),r.a.createElement("option",{value:"quanah"},"Quanah"),r.a.createElement("option",{value:"vernon"},"Vernon"))),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Create Account"})))}}]),t}(a.Component),w=n(46),y=n(47),j=n(48),O=n(49),U=f,A=new E.a,k=A.get("user"),S=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:""},n.handleChange=function(e){n.setState(Object(b.a)({},e.target.id,e.target.value))},n.handleSubmitLogIn=function(e){e.preventDefault(),fetch(U+"/users/login",{body:JSON.stringify({user:{username:n.state.username,password:n.state.password}}),method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){e.user?(A.set("user",e.user.id,{path:"/"}),A.set("token",e.token,{path:"/"}),n.props.getCurrentUser(e.user.id),n.props.handleLogIn(),n.setState({username:"",password:"",credentialError:!1}),n.props.history.push("/student")):n.setState({password:"",credentialError:!0})}).catch(function(e){return console.log(e)})},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){k&&this.props.history.push("/student")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(g.a,null,r.a.createElement("h4",{textalign:"center"},"Sign In"),r.a.createElement(w.a,{onSubmit:this.handleSubmitLogIn},r.a.createElement(y.a,null,r.a.createElement(j.a,{for:"username"}),r.a.createElement(O.a,{type:"text",name:"username",id:"username",onChange:this.handleChange,value:this.state.username,placeholder:"Username"}),r.a.createElement(j.a,{for:"password"}),r.a.createElement(O.a,{type:"password",name:"password",id:"password",onChange:this.handleChange,value:this.state.password,placeholder:"Password"}),r.a.createElement(O.a,{type:"submit",value:"Sign In"}),r.a.createElement("br",null),r.a.createElement("h4",null,r.a.createElement(h.b,{to:"/createaccount"},"Create Account")))),this.state.credentialError?r.a.createElement("h2",null,"Username or Password Incorrect"):null))}}]),t}(a.Component),I=f,L=(new E.a).get("user"),P=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,l=new Array(a),s=0;s<a;s++)l[s]=arguments[s];return(n=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(l)))).state={loggedIn:!1},n.handleCompletedChange=function(e){var t=e.target.id;console.log(e.target.checked),fetch(I+"/assignments/"+t,{body:JSON.stringify({completed:!!e.target.checked}),method:"PATCH",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then(n.forceUpdate()).catch(function(e){return console.log(e)})},n.logOut=function(){return n.props.handleLogOut(),r.a.createElement(d.a,{to:"/"})},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(g.a,null,this.props.currentUser?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{textAlign:"right"}},r.a.createElement("h4",null,"user ",this.props.currentUser.username),r.a.createElement("button",{onClick:this.logOut},"Sign Out")),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name: "),r.a.createElement("td",null,this.props.currentUser.name)),r.a.createElement("tr",null,r.a.createElement("th",null,"Instrument: "),r.a.createElement("td",null,this.props.currentUser.instrument)),r.a.createElement("tr",null,r.a.createElement("th",null,"Location: "),r.a.createElement("td",null,this.props.currentUser.location)))),r.a.createElement("b",null,"Assignments: "),r.a.createElement("br",null),r.a.createElement("br",null),this.props.userAssignments.map(function(t,n){return r.a.createElement("div",{key:n},r.a.createElement("h6",null,"Date: ",t.date),r.a.createElement("h6",null,"Assignment: ",t.content),r.a.createElement("h6",null,"Completed:",r.a.createElement("form",null,r.a.createElement("input",{type:"checkbox",name:"completed",id:t.id,checked:t.completed,onChange:e.handleCompletedChange})),t.completed))}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){return e.props.handleDeleteUser(L)}},"Delete Account"),r.a.createElement("br",null),r.a.createElement("br",null)):r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",null,r.a.createElement(h.b,{to:"/"},"Click here to Sign In")))))}}]),t}(a.Component),x=(n(42),f),D=new E.a,T=D.get("token"),B=D.get("user"),J=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).state={currentUser:void 0,loggedIn:!1,assignments:[],userAssignments:[]},n.handleLogIn=function(){console.log("handle log in ran"),n.setState({loggedIn:!0})},n.getCurrentUser=function(e){fetch(x+"/users/"+e,{method:"GET",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json",Authorization:"Bearer "+T}}).then(function(e){return e.json()}).then(function(e){n.setState({currentUser:e})}).then(function(){n.handleLogIn()})},n.checkCurrentUser=function(){B&&n.getCurrentUser(B)},n.handleLogOut=function(){console.log("handleLogOut ran"),D.remove("token"),D.remove("user"),n.setState({loggedIn:!1})},n.handleDeleteUser=function(e){fetch(x+"/users/"+e,{method:"DELETE",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json",Authorization:"Bearer "+T}}).then(n.handleLogOut).catch(function(e){return console.log(e)})},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getAssignments(),this.checkCurrentUser()}},{key:"getAssignments",value:function(){var e={singleUserAssignments:[]};fetch(x+"/assignments").then(function(e){return e.json()}).then(function(t){t.map(function(t){t.user_id==B&&e.singleUserAssignments.push(t)})}).then(this.setState({userAssignments:e.singleUserAssignments})).catch(function(e){return console.error(e)})}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,null,r.a.createElement("div",null,r.a.createElement(p.a,{fluid:!0},r.a.createElement(g.a,{fluid:!0},r.a.createElement("h1",null,"Stephen Gilbert Musical Instruction"),r.a.createElement("p",null,"Student Portal"))),r.a.createElement(d.b,{exact:!0,path:"/",render:function(t){return r.a.createElement(S,Object.assign({},t,{baseURL:x,handleLogIn:e.handleLogIn,getCurrentUser:e.getCurrentUser,currentUser:e.state.currentUser}))}}),r.a.createElement(d.b,{path:"/student",render:function(t){return r.a.createElement(P,Object.assign({},t,{loggedIn:e.state.loggedIn,currentUser:e.state.currentUser,getCurrentUser:e.getCurrentUser,userAssignments:e.state.userAssignments,handleLogOut:e.handleLogOut,handleDeleteUser:e.handleDeleteUser}))}}),r.a.createElement(d.b,{path:"/createaccount",render:function(e){return r.a.createElement(C,{baseURL:x})}}))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(43);s.a.render(r.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,1,2]]]);
//# sourceMappingURL=main.df9a20fd.chunk.js.map
(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(2),a=t(15),u=t.n(a),o=t(6),i=t(4),d=function(e){var n=e.newName,t=e.handleNameChange,c=e.newPhone,a=e.handlePhoneChange,u=e.submitNewPhone;return Object(r.jsxs)("form",{onSubmit:u,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:n,onChange:t})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:c,onChange:a})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},h=function(e){var n=e.handleFilterChange;return Object(r.jsxs)("div",{children:["filter on ",Object(r.jsx)("input",{onChange:n})]})},s=function(e){var n=e.person,t=e.handleDelete;return Object(r.jsxs)("div",{children:[n.name," ",n.number," ",Object(r.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},l=function(e){var n=e.persons,t=e.filter,c=e.handleDelete;return Object(r.jsx)("div",{children:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(r.jsx)(s,{person:e,handleDelete:c},e.name)}))})},j=t(3),f=t.n(j),b="http://localhost:3001/persons",O={getAll:function(){return f.a.get(b).then((function(e){return e.data}))},addPerson:function(e){return f.a.post(b,e).then((function(e){return e.data}))},deletePerson:function(e){return f.a.delete("".concat(b,"/").concat(e.id)).then((function(e){return e.data}))},updatePerson:function(e){return f.a.put("".concat(b,"/").concat(e.id),e).then((function(e){return e.data}))}},m=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],u=Object(c.useState)(""),s=Object(i.a)(u,2),j=s[0],f=s[1],b=Object(c.useState)(""),m=Object(i.a)(b,2),p=m[0],v=m[1],x=Object(c.useState)(""),w=Object(i.a)(x,2),g=w[0],P=w[1];return Object(c.useEffect)((function(){O.getAll().then((function(e){return a(e)})).catch((function(e){return alert(e)}))}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(h,{handleFilterChange:function(e){return P(e.target.value)}}),Object(r.jsx)("h2",{children:"Add New"}),Object(r.jsx)(d,{newName:j,handleNameChange:function(e){return f(e.target.value)},newPhone:p,handlePhoneChange:function(e){return v(e.target.value)},submitNewPhone:function(e){e.preventDefault();var n=t.find((function(e){return e.name===j}));n?function(e){if(window.confirm("".concat(e.name," is already in the phonebook. Replace the old number with a new one?"))){var n=Object(o.a)(Object(o.a)({},e),{},{number:p});O.updatePerson(n).then((function(e){a(t.map((function(t){return t.id===e.id?n:t}))),f(""),v("")})).catch((function(e){return alert(e)}))}}(n):function(){var e={name:j,number:p};O.addPerson(e).then((function(e){a(t.concat(e)),f(""),v("")})).catch((function(e){return alert(e)}))}()}}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(l,{persons:t,filter:g,handleDelete:function(e){window.confirm("Delete ".concat(e.name,"?"))&&O.deletePerson(e).then((function(n){return a(t.filter((function(n){return n.id!==e.id})))})).catch((function(e){return alert(e)}))}})]})};u.a.render(Object(r.jsx)(m,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.a07e9c5b.chunk.js.map
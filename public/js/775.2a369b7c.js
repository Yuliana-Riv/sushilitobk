"use strict";(self["webpackChunksoma_ft"]=self["webpackChunksoma_ft"]||[]).push([[775],{2571:function(t,s,a){a.d(s,{Z:function(){return u}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"bloquefooter"},[s("div",{staticClass:"fila1footer"},[t._m(0),t._m(1),s("div",{staticClass:"newsfooter"},[s("div",{staticClass:"fila1newsfo"},[s("form",{on:{submit:function(s){return s.preventDefault(),t.suscribirse(t.email)}}},[s("h5",{staticClass:"titnewslfo"},[t._v(" SUSCRÍBETE PARA RECIBIR PROMOCIONES EXCLUSIVAS ")]),s("div",{staticClass:"bloquenewsletter"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",name:"",id:"",placeholder:"Correo electrónico"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}}),s("button",{staticClass:"submitnewsl-btn",attrs:{type:"submit"}},[t._v("Enviar")])]),"success"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_success"},[t._v(t._s(this.message))])]):t._e(),"error"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_error"},[t._v(t._s(this.message))])]):t._e()])]),t._m(2)])]),s("div",{staticClass:"fila2footer"},[s("p",[s("span",[t._v("Copyright "+t._s(t.yyyy))]),t._v(" © Todos los Derechos Reservados.")])])])},e=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"colmenu"},[s("div",{staticClass:"menufooter"},[s("h5",[t._v("MENÚ")]),s("ul",[s("li",[s("a",{attrs:{href:"/"}},[t._v("BUSCADOR")])]),s("li",[s("a",{attrs:{href:"#nosotros"}},[t._v("NOSOTROS")])]),s("li",[s("a",{attrs:{href:"#directorio"}},[t._v("AGENTES")])]),s("li",[s("a",{attrs:{href:"#servicios"}},[t._v("SERVICIOS")])]),s("li",[s("a",{attrs:{href:"#contacto"}},[t._v("CONTACTO")])])])]),s("img",{staticClass:"imgfoomv",attrs:{src:a(6583)}}),s("img",{staticClass:"imgfoopc",attrs:{src:a(7946)}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"infofooter"},[s("h5",[t._v("INFORMACIÓN")]),s("div",{staticClass:"bloqueiff"},[s("p",{staticClass:"titpif"},[t._v("Dirección")]),s("p",{staticClass:"txtpif"},[t._v(" Dirección Calle y Número Colonia, CP Ciudad, Estado ")]),s("p",{staticClass:"txtpif ultpif"},[t._v("Hermosillo, Sonora")]),s("p",{staticClass:"titpif"},[t._v("Teléfono")]),s("a",{attrs:{href:"tel:6624290145"}},[s("p",{staticClass:"txtpif ultpif"},[t._v("(662) 000 00 00")])]),s("p",{staticClass:"titpif"},[t._v("Horario")]),s("p",{staticClass:"txtpif ultpif last"},[t._v("Lunes a Sábado – 7:00 am a 3:00 pm")])]),s("div",{staticClass:"redesfooter"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(3743),alt:"Icono Facebook"}})]),s("a",{staticClass:"btnigfo",attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(4044),alt:"Icono Instagram"}})]),s("a",{staticClass:"btnigfo",attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(956),alt:"Icono Twitter"}})])])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"fila2newsfo"},[s("div",{staticClass:"col1nefo"},[s("a",{attrs:{href:"#"}},[s("p",[t._v("Politicas de Privacidad")])]),s("a",{attrs:{href:"#"}},[s("p",[t._v("Terminos de Uso")])])]),s("div",{staticClass:"col2nefo"},[s("img",{attrs:{src:a(4021),alt:""}})])])}],r=a(7484),o=a.n(r),c={data(){return{email:"",status:"",message:"",yyyy:"2022"}},created(){this.yyyy=o()().format("YYYY")},methods:{suscribirse:async function(t){this.status="",this.message="";let s=o()().format("YYYY-MM-DD"),a={email:t,sub_date:s},i=await this.$store.dispatch("suscripciones/addItemSbs",{option:"suscripciones",item:a});"error"==i.status?(this.status="error",this.message=i.message,this.delStatus()):(this.status="success",this.message="Suscripción exitosa!",this.email="",this.delStatus())},delStatus:function(){setTimeout((()=>this.delMsgs()),3e3)},delMsgs:function(){this.status="",this.message=""}}},n=c,l=a(1001),f=(0,l.Z)(n,i,e,!1,null,"51e194a3",null),u=f.exports},6964:function(t,s,a){a.d(s,{Z:function(){return f}});var i=function(){var t=this,s=t._self._c;return s("div",{class:{active:1==t.act},attrs:{id:"Navigator"}},[s("div",{staticClass:"nav-b"},[s("div",{staticClass:"nav-c"},[s("div",{staticClass:"sc1"},[t._m(0),s("img",{staticClass:"bars pointer",attrs:{src:a(9459),alt:"bars"},on:{click:function(s){t.act=!0}}})]),s("div",{staticClass:"close-b",class:{active:1==t.act},on:{click:function(s){t.act=!1}}},[s("div",{staticClass:"menu-conts",class:{active:1==t.act},on:{click:function(t){t.stopPropagation()}}},[s("img",{staticClass:"bars pointer",attrs:{src:a(3268),alt:"cross"},on:{click:function(s){t.act=!1}}}),s("div",{staticClass:"m-items"},[s("a",{class:{active:"buscador"==t.hop},attrs:{href:"/"},on:{click:function(s){return t.click("buscador")}}},[t._v("BUSCADOR")]),s("a",{class:{active:"nosotros"==t.hop},attrs:{href:"/#nosotros"},on:{click:function(s){return t.click("nosotros")}}},[t._v("NOSOTROS")]),s("a",{class:{active:"agentes"==t.hop},attrs:{href:"/#directorio"},on:{click:function(s){return t.click("agentes")}}},[t._v("AGENTES")]),s("a",{class:{active:"servicios"==t.hop},attrs:{href:"/#servicios"},on:{click:function(s){return t.click("servicios")}}},[t._v("SERVICIOS")]),s("a",{class:{active:"contacto"==t.hop},attrs:{href:"/#contacto"},on:{click:function(s){return t.click("contacto")}}},[t._v("CONTACTO")]),s("div",{staticClass:"sm-c"},[s("a",{attrs:{href:"https://www.facebook.com/profile.php?id=100063812032380",target:"_blank",rel:"noopener noreferrer"},on:{click:function(s){t.act=!1}}},[s("img",{staticClass:"sm-l",attrs:{src:a(3743),alt:""}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"},on:{click:function(s){t.act=!1}}},[s("img",{staticClass:"sm-l",attrs:{src:a(4044),alt:""}})])])])])])])])])},e=[function(){var t=this,s=t._self._c;return s("a",{staticClass:"logo",attrs:{href:"/"}},[s("img",{attrs:{src:a(8320),alt:"logo"}})])}],r=a(629),o={data(){return{act:!1}},created(){let t=localStorage.getItem("ruta");this.setHistoryOptionMain(t)},computed:{hop(){return this.$store.getters["main/getHistoryOption"]}},methods:{...(0,r.nv)("main",["setHistoryOptionMain"]),click(t){window.localStorage.setItem("ruta",t),this.setHistoryOptionMain(t),this.act=!1}}},c=o,n=a(1001),l=(0,n.Z)(c,i,e,!1,null,null,null),f=l.exports},9775:function(t,s,a){a.r(s),a.d(s,{default:function(){return u}});var i=function(){var t=this,s=t._self._c;return s("div",[s("Navigator"),t._m(0),s("Footer")],1)},e=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"error-404"},[s("div",{staticClass:"content_err"},[s("div",{staticClass:"divimg"},[s("img",{staticClass:"img_err",attrs:{src:a(3723),alt:""}})]),s("div",{staticClass:"errinfo"},[s("h2",[t._v("Algo salio mal...")]),s("p",[t._v("No hemos logrado encontrar el contenido que buscas. ")]),s("p",[t._v(" Utiliza el siguiente enlace para encontrar "),s("span",[t._v("el camino de regreso.")])])])])])}],r=a(6964),o=a(2571),c={name:"Error404",data(){return{status:"error",message:""}},components:{Navigator:r.Z,Footer:o.Z}},n=c,l=a(1001),f=(0,l.Z)(n,i,e,!1,null,"e00ad496",null),u=f.exports},7946:function(t,s,a){t.exports=a.p+"img/imgfooter.64174aaf.svg"},6583:function(t,s,a){t.exports=a.p+"img/imgfootermv.ed7821df.svg"},4021:function(t,s,a){t.exports=a.p+"img/logofooterlit.39001f3b.svg"},9459:function(t,s,a){t.exports=a.p+"img/Bars.3a073478.svg"},3743:function(t,s,a){t.exports=a.p+"img/FB.afedcd86.svg"},4044:function(t,s,a){t.exports=a.p+"img/IG.6a9aa66a.svg"},956:function(t,s,a){t.exports=a.p+"img/TW.a96622d0.svg"},3268:function(t,s,a){t.exports=a.p+"img/close.1e6438ef.svg"},8320:function(t,s,a){t.exports=a.p+"img/soma.fe94fc69.svg"},3723:function(t,s,a){t.exports=a.p+"img/error.9d655f5c.png"}}]);
//# sourceMappingURL=775.2a369b7c.js.map
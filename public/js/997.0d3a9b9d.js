"use strict";(self["webpackChunksoma_ft"]=self["webpackChunksoma_ft"]||[]).push([[997],{199:function(s,e,t){t.d(e,{Z:function(){return d}});var a=function(){var s=this,e=s._self._c;return e("div",{staticClass:"bloquefooter"},[e("div",{staticClass:"fila1footer"},[s._m(0),s._m(1),e("div",{staticClass:"newsfooter"},[e("div",{staticClass:"fila1newsfo"},[e("form",{on:{submit:function(e){return e.preventDefault(),s.suscribirse(s.email)}}},[e("h5",{staticClass:"titnewslfo"},[s._v(" SUSCRÍBETE A NUESTRO NEWSLETTER ")]),e("div",{staticClass:"bloquenewsletter"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.email,expression:"email"}],attrs:{type:"email",name:"",id:"",placeholder:"Correo electrónico"},domProps:{value:s.email},on:{input:function(e){e.target.composing||(s.email=e.target.value)}}}),e("button",{staticClass:"submitnewsl-btn",attrs:{type:"submit"}},[s._v("Enviar")])]),"success"==this.status?e("div",[e("p",{staticClass:"cart_msg cart_success"},[s._v(s._s(this.message))])]):s._e(),"error"==this.status?e("div",[e("p",{staticClass:"cart_msg cart_error"},[s._v(s._s(this.message))])]):s._e()])]),s._m(2)])]),e("div",{staticClass:"fila2footer"},[e("p",[e("span",[s._v("Copyright "+s._s(s.yyyy))]),s._v(" © Todos los Derechos Reservados.")])])])},i=[function(){var s=this,e=s._self._c;return e("div",{staticClass:"colmenu"},[e("div",{staticClass:"menufooter"},[e("h5",[s._v(" MENÚ")]),e("ul",[e("li",[e("a",{attrs:{href:"/"}},[s._v("INICIO")])]),e("li",[e("a",{attrs:{href:"#nosotros"}},[s._v("NOSOTROS")])]),e("li",[e("a",{attrs:{href:"#directorio"}},[s._v("MENÚ")])]),e("li",[e("a",{attrs:{href:"#servicios"}},[s._v("CONTACTO")])]),e("li",[e("a",{attrs:{href:"#contacto"}},[s._v("BLOG")])])])]),e("img",{staticClass:"imgfoomv",attrs:{src:t(6583)}}),e("img",{staticClass:"imgfoopc",attrs:{src:t(7946)}})])},function(){var s=this,e=s._self._c;return e("div",{staticClass:"infofooter"},[e("h5",[s._v("INFORMACIÓN")]),e("div",{staticClass:"bloqueiff"},[e("p",{staticClass:"titpif"},[s._v("Dirección")]),e("p",{staticClass:"txtpif"},[s._v(" Calle y Número Colonia, CP Ciudad, Estado ")]),e("p",{staticClass:"titpif"},[e("br"),s._v(" Teléfono")]),e("a",{attrs:{href:"tel:6624290145"}},[e("p",{staticClass:"txtpif ultpif"},[s._v("(000) 000 00 00")])]),e("p",{staticClass:"titpif"},[s._v("Horario")]),e("p",{staticClass:"hor"},[s._v("Lun–Dom 12 pm a 10 pm")])]),e("div",{staticClass:"redesfooter"},[e("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:t(3743),alt:"Icono Facebook"}})]),e("a",{staticClass:"btnigfo",attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:t(4044),alt:"Icono Instagram"}})]),e("a",{staticClass:"btnigfo",attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[e("img",{attrs:{src:t(956),alt:"Icono Instagram"}})])])])},function(){var s=this,e=s._self._c;return e("div",{staticClass:"fila2newsfo"},[e("div",{staticClass:"col1nefo"},[e("a",{attrs:{href:"#"}},[e("p",[s._v("Politicas de Privacidad")])]),e("a",{attrs:{href:"#"}},[e("p",[s._v("Terminos de Uso")])])]),e("div",{staticClass:"col2nefo"},[e("img",{attrs:{src:t(4021),alt:""}})])])}],o=t(7484),r=t.n(o),c={data(){return{email:"",status:"",message:"",yyyy:"2022"}},created(){this.yyyy=r()().format("YYYY")},methods:{suscribirse:async function(s){this.status="",this.message="";let e=r()().format("YYYY-MM-DD"),t={email:s,sub_date:e},a=await this.$store.dispatch("suscripciones/addItemSbs",{option:"suscripciones",item:t});"error"==a.status?(this.status="error",this.message=a.message,this.delStatus()):(this.status="success",this.message="Suscripción exitosa!",this.email="",this.delStatus())},delStatus:function(){setTimeout((()=>this.delMsgs()),3e3)},delMsgs:function(){this.status="",this.message=""}}},n=c,l=t(1001),u=(0,l.Z)(n,a,i,!1,null,"4a3341b9",null),d=u.exports},6964:function(s,e,t){t.d(e,{Z:function(){return u}});var a=function(){var s=this,e=s._self._c;return e("div",{class:{active:1==s.act},attrs:{id:"Navigator"}},[e("div",{staticClass:"nav-b"},[e("div",{staticClass:"nav-c"},[e("div",{staticClass:"sc1"},[s._m(0),e("img",{staticClass:"bars pointer",attrs:{src:t(9459),alt:"bars"},on:{click:function(e){s.act=!0}}})]),e("div",{staticClass:"close-b",class:{active:1==s.act},on:{click:function(e){s.act=!1}}},[e("div",{staticClass:"menu-conts",class:{active:1==s.act},on:{click:function(s){s.stopPropagation()}}},[e("img",{staticClass:"bars pointer",attrs:{src:t(3268),alt:"cross"},on:{click:function(e){s.act=!1}}}),e("div",{staticClass:"m-items"},[e("a",{class:{active:"buscador"==s.hop},attrs:{href:"/"},on:{click:function(e){return s.click("buscador")}}},[s._v("BUSCADOR")]),e("a",{class:{active:"nosotros"==s.hop},attrs:{href:"/#nosotros"},on:{click:function(e){return s.click("nosotros")}}},[s._v("NOSOTROS")]),e("a",{class:{active:"agentes"==s.hop},attrs:{href:"/#directorio"},on:{click:function(e){return s.click("agentes")}}},[s._v("AGENTES")]),e("a",{class:{active:"servicios"==s.hop},attrs:{href:"/#servicios"},on:{click:function(e){return s.click("servicios")}}},[s._v("SERVICIOS")]),e("a",{class:{active:"contacto"==s.hop},attrs:{href:"/#contacto"},on:{click:function(e){return s.click("contacto")}}},[s._v("CONTACTO")]),e("div",{staticClass:"sm-c"},[e("a",{attrs:{href:"https://www.facebook.com/profile.php?id=100063812032380",target:"_blank",rel:"noopener noreferrer"},on:{click:function(e){s.act=!1}}},[e("img",{staticClass:"sm-l",attrs:{src:t(3743),alt:""}})]),e("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"},on:{click:function(e){s.act=!1}}},[e("img",{staticClass:"sm-l",attrs:{src:t(4044),alt:""}})])])])])])])])])},i=[function(){var s=this,e=s._self._c;return e("a",{staticClass:"logo",attrs:{href:"/"}},[e("img",{attrs:{src:t(8320),alt:"logo"}})])}],o=t(629),r={data(){return{act:!1}},created(){let s=localStorage.getItem("ruta");this.setHistoryOptionMain(s)},computed:{hop(){return this.$store.getters["main/getHistoryOption"]}},methods:{...(0,o.nv)("main",["setHistoryOptionMain"]),click(s){window.localStorage.setItem("ruta",s),this.setHistoryOptionMain(s),this.act=!1}}},c=r,n=t(1001),l=(0,n.Z)(c,a,i,!1,null,null,null),u=l.exports},2997:function(s,e,t){t.r(e),t.d(e,{default:function(){return d}});var a=function(){var s=this,e=s._self._c;return e("div",{staticClass:"politicas"},[e("Navigator"),s._m(0),s._m(1),e("Footer")],1)},i=[function(){var s=this,e=s._self._c;return e("div",{staticClass:"banner"},[e("p",{staticClass:"tit1"},[s._v("Política de Privacidad")])])},function(){var s=this,e=s._self._c;return e("div",{staticClass:"contenido"},[e("p",{staticClass:"txt1"},[s._v(" HUUPA Coffee, empresa legalmente constituida de conformidad con las leyes mexicanas con domicilio fiscal en  C. Pino Suárez 90, Centro, 83000, en la ciudad de Hermosillo, Sonora, es responsable de recabar sus datos personales, del uso que se le dé a los mismos y de su protección. FINES DE USO DE INFORMACIÓN RECABADA Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita: •Informar sobre promociones, actividades y/o eventos • Evaluar calidad en el servicio. De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención: • Mercadotecnia y/o publicidad. Los datos que podemos recabar para los fines mencionados en el presente Aviso de Privacidad Integral son los siguientes: • Nombre. • Correo electrónico. • Dirección. • Teléfono. Sus datos podrán ser proporcionados a terceros única y exclusivamente a fabricantes y/o proveedores, con los que HUUPA Coffee mantiene una relación lícita y ética de negocios, para efectos de Marketing siempre con las limitaciones señaladas en la Ley Federal de Protección de Datos Personales en Posesión de Particulares. Todos sus datos personales son tratados con estricta confidencialidad de acuerdo a la legislación aplicable y vigente en el país, por ello le informamos que usted tiene en todo momento los derechos para el Acceso, Rectificación, Cancelación u Oposición al tratamiento que le damos a sus datos personales (Derechos ARCO), los cuales usted o su representante legal podrán hacer valer elaborando la “Solicitud Ejercicio de los Derechos ARCO” y enviarla escaneada dirigida a nuestra área de Protección de Datos al correo electrónico contacto@huupa.coffee o por escrito en cualquiera de nuestras sucursales. Es importante que considere los siguientes puntos al momento de enviar o entregar su solicitud: • Indicar su nombre, domicilio y correo electrónico para poder comunicarle la respuesta a su solicitud. • Indicar los datos personales respecto de los que se busca ejercer alguno de los derechos. • Anexar cualquier documento o información que facilite la localización de sus datos personales. • Anexar copia del documento que acredite su identidad (credencial de elector, cédula profesional o pasaporte vigente). CAMBIOS AL AVISO DE PRIVACIDAD HUUPA Coffee se reserva el derecho de modificar en cualquier momento y sin previo aviso el presente aviso de privacidad por actualizaciones legislativas, jurisprudenciales, políticas internas, nuevos requisitos para la venta de productos en nuestra Tienda Online y/o cualquier otra causa. En tal caso, las modificaciones estarán disponibles en nuestra página de internet www.huupa.xyz, por lo que le recomendamos verificar periódicamente en caso de que existan cambios. ")])])}],o=(t(3631),t(6964)),r=t(199),c={name:"TERMINOS",components:{Navigator:o.Z,Footer:r.Z},metaInfo(){return{title:"Política de Privacidad",titleTemplate:"%s | Soma Inmobiliaria",htmlAttrs:{lang:"es"},meta:[{charset:"utf-8"},{name:"description",content:"Soma Inmobiliaria."},{name:"viewport",content:"width=device-width, initial-scale=1"}]}}},n=c,l=t(1001),u=(0,l.Z)(n,a,i,!1,null,"44cc12e5",null),d=u.exports},7946:function(s,e,t){s.exports=t.p+"img/imgfooter.64174aaf.svg"},6583:function(s,e,t){s.exports=t.p+"img/imgfootermv.ed7821df.svg"},4021:function(s,e,t){s.exports=t.p+"img/logofooterlit.39001f3b.svg"},9459:function(s,e,t){s.exports=t.p+"img/Bars.3a073478.svg"},3743:function(s,e,t){s.exports=t.p+"img/FB.afedcd86.svg"},4044:function(s,e,t){s.exports=t.p+"img/IG.6a9aa66a.svg"},956:function(s,e,t){s.exports=t.p+"img/TW.a96622d0.svg"},3268:function(s,e,t){s.exports=t.p+"img/close.1e6438ef.svg"},8320:function(s,e,t){s.exports=t.p+"img/soma.fe94fc69.svg"}}]);
//# sourceMappingURL=997.0d3a9b9d.js.map
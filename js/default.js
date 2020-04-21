Vue.use(VueCodemirror)

var editor = {
    lin:1,
    col:1,
    nombre:'Nuevo-1',
    code: '',
    cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping:true,
        mode: 'text/javascript',
        theme: 'monokai'
    }
}

const code2 = new Vue({
    el: '#editores',
    data: {
        nombre_proyecto:"code2",
        editores:[editor],
        actual:1,
        contador:1
    },
    components: {
    	LocalCodemirror: VueCodemirror.codemirror
    },
    methods: {
        onCmCursorActivity(cm) {
            this.editores[this.actual-1].lin=cm.doc.getCursor().line+1;
            this.editores[this.actual-1].col=cm.doc.getCursor().ch+1;
        },
        onCmInput(newCode) {
            this.editores[this.actual-1].code = newCode
        },
        newTab(){
            var nuevo = new Object;
            nuevo.lin=1;
            nuevo.col=1;
            nuevo.nombre="Nuevo-"+(++this.contador);
            nuevo.code='';
            nuevo.cmOption={
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                lineWrapping:true,
                mode: 'text/javascript',
                theme: "monokai"
            };
            this.editores.push(nuevo);
            this.changeTab(nuevo);
        },
        changeTab(editor){
            this.actual =this.editores.findIndex(i => i.nombre === editor.nombre)+1;
        },
        closeTab(editor){
            var pos = this.editores.findIndex(i => i.nombre === editor.nombre);
            console.log("Cerrando en:",pos);
            //TODO cerrar ventanas
            /*if(this.editores.length-1===0){
                this.newTab();
            }
            this.editores.splice(pos,1);*/
        }
    }	
})

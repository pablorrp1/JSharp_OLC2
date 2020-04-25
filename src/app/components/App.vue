<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="#">{{title}}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuArchivo" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Archivo
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuArchivo">
                            <a class="dropdown-item" href="#">Nuevo Archivo</a>
                            <a class="dropdown-item" href="#">Abrir Archivo</a>
                            <a class="dropdown-item" href="#">Guardar</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuEjecutar" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ejecutar
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuEjecutar">
                            <a class="dropdown-item" href="#" @click="analize">Obtener C3D</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Terminal</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Ayuda</a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li>
                        <button class="btn btn-outline-success btn-nav" @click="newTab" >
                            <span class="material-icons">note_add</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid" style="padding-top: 65px;">
            <div class="card">
                <div class="card-header">
                    <nav class="tabblable">
                        <ul class="nav nav-tabs card-header-tabs" style="overflow-x:auto; overflow-y:hidden; flex-wrap:nowrap;" id="tabs-list" role="tablist">
                            <li v-for="tab of editores" v-bind:key="tab.number" class="nav-item" >
                                <div class="btn-group">
                                    <button class="btn btn-outline-secondary" 
                                    style="width: 100px; min-width: 100px;" @click="changeTab(tab)">
                                        <div class="text-truncate">
                                            {{ tab.nombre }}
                                        </div>
                                    </button>
                                    <button class="btn btn-danger" @click="closeTab(tab)">
                                        <span class="material-icons">cancel</span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="card-body">
                    <local-codemirror
                        :value="editores[actual-1].code"
                        :options="editores[actual-1].cmOption"
                        @cursor-activity="onCmCursorActivity($event)"
                        @input="onCmInput"
                        @gutterClick="onCmGutterClick">
                    </local-codemirror>
                    <table class="table table-sm">
                        <tr>
                            <td>
                                Editor actual: {{editores[actual-1].nombre}} 
                            </td>
                            <td style="width:7%;">
                                Lín. {{editores[actual-1].lin}}
                            </td>
                            <td style="width:7%;">
                                Col. {{editores[actual-1].col}}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="tareas-list" role="tablist">
                        <li>
                            <button class="btn btn-outline" type="button" data-toggle="collapse" data-target="#tareasbody" aria-expanded="true" aria-controls="tareasbody" @click="changeSize">
                                <span class="material-icons">{{icon_size}}</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#Terminal" role="tab" aria-controls="Terminal" aria-selected="true">Terminal</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"  href="#Salida" role="tab" aria-controls="Salida" aria-selected="false">Salida</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body collapse" id="tareasbody">
                    <div class="tab-content mt-3">
                        <div class="tab-pane active" id="Terminal" role="tabpanel">
                            <local-codemirror
                                :value="consola"
                                :options="conOption">
                            </local-codemirror>
                            <table class="table table-sm table-bordered">
                                <tr>
                                    <td>
                                    </td>
                                    <td style="width:7%;">
                                        <button class="btn btn-outline-success btn-nav" @click="cleanConsole" >
                                            <span class="material-icons">backspace</span>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="tab-pane" id="Salida" role="tabpanel" aria-labelledby="Salida-tab">  
                            <local-codemirror
                                :value="c3d"
                                :options="conOption">
                            </local-codemirror>
                            <table class="table table-sm table-bordered">
                                <tr>
                                    <td>
                                    </td>
                                    <td style="width:7%;">
                                        <button class="btn btn-outline-success btn-nav" @click="cleanC3D" >
                                            <span class="material-icons">backspace</span>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
class Editor {
    constructor(number){
        this.number=number;
        this.lin=1;
        this.col=1;
        this.nombre='Nuevo-'+number;
        this.code='';
        this.c3d='';
        this.cmOption={
            tabSize: 4,
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping:true,
            mode: 'text/javascript',
            theme:'monokai',
            gutters: ["breakpoints","CodeMirror-linenumbers"]
        };
    }
}

var consoleOption={
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping:true,
    readOnly:true,
    mode: 'text/javascript',
    theme:'monokai'
};

    export default {
        data(){
            return{
                title:"J#",
                contador:1,
                actual:1,
                editores:[new Editor(1)],
                consola:'',
                c3d:'',
                icon_size:'keyboard_arrow_down',
                conOption: consoleOption
            }
        },
        components:{
            LocalCodemirror: VueCodemirror.codemirror
        },
        methods: {
            onCmCursorActivity(cm) {
                this.editores[this.actual-1].lin=cm.doc.getCursor().line+1;
                this.editores[this.actual-1].col=cm.doc.getCursor().ch+1;
            },
            onCmInput(newCode) {
                this.editores[this.actual-1].code = newCode;
            },
            onCmGutterClick(cm,n){
                console.log(n);
                //console.log("Gutter acá",this.editores[this.actual-1].lin);
                
            },
            newTab(){
                var nuevo = new Editor(++this.contador);
                this.editores.push(nuevo);
                this.changeTab(nuevo);
            },
            changeTab(editor){
                this.actual =this.findTabPosition(editor)+1;
            },
            findTabPosition(editor){
                return this.editores.findIndex(i => i.nombre === editor.nombre);
            },
            closeTab(editor){
                if(this.editores.length==1){
                    this.editores.splice(0,1);
                    this.newTab();
                }else{
                    var pos = this.findTabPosition(editor);
                    var change=0;
                    this.editores.splice(pos,1);
                    if(pos!==0){
                        change = pos-1;
                    }
                    this.changeTab(this.editores[change]);
                }
            },
            analize(){
                var texto = this.editores[this.actual-1].code;
                
            },
            writeConsole(text){
                this.consola+=text+"\n";
            },
            cleanConsole(){
                this.consola="";
            },
            writeC3D(text){
                this.c3d+=text+"\n";
            },
            cleanC3D(){
                this.c3d="";
            },
            changeSize(){
                if(this.icon_size=='keyboard_arrow_down')
                    this.icon_size='keyboard_arrow_up';
                else
                    this.icon_size='keyboard_arrow_down';
            }
        }
    }
</script>

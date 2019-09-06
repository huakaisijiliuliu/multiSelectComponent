$(function(){
    /*初始化多选下拉组件*/
    var  params={
        selectAbleArray:[
            {id:"1",value:"苹果",checked:true},
            {id:"2",value:"香蕉",checked:true},
            {id:"3",value:"梨",checked:true},
            {id:"4",value:"草莓",checked:true},
            {id:"5",value:"菠萝",checked:false},
            {id:"6",value:"柚子",checked:false},
        ]}
    var  multi=$('.muliti').multiSelectComponent(params);
})
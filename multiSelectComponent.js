/***
 * 多选下来菜单组件
 * @author  liupc
 *
 //暴露选中数据
    getSelectValue()
 //修改初始化数据
 setSelectAbleValue(value)
 //暴露所有可选数据
 getSelectAbleValue(value)
 *
 */
$(!function ($) {
    $.fn.multiSelectComponent = function (params) {
        /*初始化参数*/
        params = $.extend({
            selectAbleArray: [
                {id: "1", value: "中国", checked: true},
                {id: "2", value: "加拿大", checked: true},
                {id: "3", value: "美国", checked: true},
                {id: "4", value: "韩国", checked: true},
                {id: "5", value: "日本", checked: false},
                {id: "6", value: "墨尔本", checked: false},
            ]
        }, params);
        var self = this;
        //选中数据
        var selectValue = [];
        //所有下拉可选数据
        var selectAbleValue=params.selectAbleArray;
        /**
         * 初始化dom
         */
        initSelectDom();

        function initSelectDom() {
            //写初始的dom
            var inithtml = '<div class="dropdown bootstrap-select show-tick bs3 open multiSelectComponent" >   ' +
                '    <button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" role="combobox"   ' +
                '            aria-owns="bs-select-1" aria-haspopup="listbox" aria-expanded="true">   ' +
                '        <div class="filter-option" style="">   ' +
                '   ' +
                '        </div>   ' +
                '        <span class="bs-caret"><span class="caret"></span></span></button>   ' +
                '    <div class="dropdown-menu open" style="max-height: 575px; overflow: hidden; min-height: 92px;">   ' +
                '        <div class="inner open" role="listbox" id="bs-select-1" tabindex="-1" aria-multiselectable="true"   ' +
                '             style="max-height: 563px; overflow-y: auto; min-height: 80px;">   ' +
                '            <ul class="dropdown-menu inner " role="presentation" style="margin-top: 0px; margin-bottom: 0px;">   ' +
                '            </ul>   ' +
                '        </div>   ' +
                '    </div>   ' +
                '</div>';
            $(self).append(inithtml);

            //将参数进行dom初始化
            initparamDom(params);

        }

        function initparamDom(params) {
            params.selectAbleArray.forEach(function (item, i) {
                var selectClass="";
                //选中元素的class
                var  selectedElment= ''
                var  isDisplay=""
                if (item.checked == true) {
                    selectClass = "selected"
                    isDisplay="inline-block"
                    selectValue.push(item);
                    selectedElment='selectedElment'
                } else {
                    isDisplay="none"
                }
                /*初始化选中元素*/
               /* if (selectClass != "") {*/
                    $(self).find('.filter-option').append('' +
                        '            <div class="token" id="token-'+item.id+'" style="display:'+isDisplay+'">   ' +
                        '                <span class="token-label" style="max-width: 1320px;">' + item.value + '</span>   ' +
                        '                <a href="#" class="close " tabindex="-1">×</a>   ' +
                        '            </div>   ' +

                        '');
             /*   }*/
                //初始化下来菜单
                $(self).find('.dropdown-menu.inner').append('' +
                    ' <li class="' + selectClass + '" id="select-'+item.id+'">' +
                    '    <a role="option"  class=" '+selectedElment+'" tabindex="0" aria-selected="true"                         ' +
                    '                              aria-setsize="5" aria-posinset="1" >   ' +
                    '    <span class="glyphicon glyphicon-ok check-mark"></span>' +
                    '    <span class="text">' + item.value + '</span></a></li>   ' +
                    '');
            })

        }
        //更改下拉菜单的选中状态
        function  updateSelectState(id,updateStr){
            var  selector= $('#select-'+id);
                if(updateStr=="select"){
                    selector.addClass("selected")
                    $(selector).find('a').addClass('selectedElment');
                }else{
                    selector.removeClass("selected")
                    $(selector).find('a').removeClass('selectedElment');
            }
        }
        //更改文本框显示数据
       function updateInputSelect(id,updateStr){
           var  inpuSelector=$('#token-'+id)
           if(updateStr=="select"){
               inpuSelector.css('display','inline-block')
            }else{
               inpuSelector.css('display','none')
            }

        }

        /**
         * 删除事件
         */
        $(self).find('.close').on('click', function (event) {
            var  id=$(this).parent().attr('id');
            var  index=id.indexOf('-');
            id=id.substring(index+1);
           /* $(this).parent().remove();*/
           //修改选中数据
            selectValue.forEach(function(item,i){
                if(item.id==id){
                    item.checked=false;
                }
            })
            /*修改文本框选中数据*/
            updateInputSelect(id,'remove');
            /*修改下拉选中状态*/
            updateSelectState(id,'remove');
            //  阻止事件冒泡
            event.stopPropagation();


        })



        //选中事件
        $(self).find('.dropdown-menu.inner  li').on('click', function (event){
            var  id=$(this).attr('id');
            var  index=id.indexOf('-');
            id=id.substring(index+1);

            if(  $(this).attr('class')=='selected'){
                //更改选中数据
                selectValue.forEach(function(item,i){
                    if(item.id==id){
                        item.checked=false;
                    }
                })
                //更改下拉菜单勾选状态
                 updateSelectState(id,"remove");
                //更改文本框中选中数据
                updateInputSelect(id,"remove");


            }else{
                //更改选中数据
                selectValue.forEach(function(item,i){
                    if(item.id==id){
                        item.checked=true;
                    }
                })
                //更改下拉菜单勾选状态
                updateSelectState(id,"select");
                //更改文本框中选中数据
                updateInputSelect(id,"select");

            }
            event.stopPropagation();
            //取消默认行为
            event.preventDefault();
        })

        //暴露选中数据
        self.getSelectValue=function(){
            return  selectValue;
        }
        //修改初始化数据
        self.setSelectAbleValue=function(value){
            selectAbleValue=value
        }

        //暴露所有可选数据
        self.getSelectAbleValue=function(value){
           return  selectAbleValue;
        }
    return  self;
    }


}(jQuery));
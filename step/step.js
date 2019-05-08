(function ($, window, document) {
    var stepName = "step",
        defaults = {
            data: null,
            current:null
        };
    //
    //初始化当前
    function step(elem, option) {

        var utl = self.URL;
        //alert(utl);
        //初始化
        this._elem = elem;//
        this._setting = $.extend(defaults, option);//合并数据
        this._defaults = defaults;
        this._name = stepName;
        this.init();
    }
    step.prototype = {
        init: function () {
            var data=this._setting.data, ele=this._elem, current=this._setting.current;
            var html = ''
                , data_length = data.length
                , percentage = 100 / data_length - 1;
            percentage += (percentage / data.length) - 2;
            //清空上一次渲染的步骤
            $(ele).empty();
            for (var i = 0; i < data_length; i++) {
                var icon = ''
                    , tail = '', temp = '';
                if (i < current) {
                    icon = 'layui-icon-ok';
                    tail = 'step-item-tail-done';
                }
                if (i < data_length - 1)
                    temp = '<div class="step-item" style="width: ' + percentage + '%;">';
                else {
                    // temp = '<div class="step-item" style="width: ' + 15 + '%;">';
                    temp = '<div class="step-item" style="width: ' + 13 + '%;">';
                }
                if (parseInt(i) + 1 < data_length) {
                    temp += '<div class="step-item-tail"><i class="' + tail + '"></i></div>';
                }

                if (icon) {
                    temp += '<div class="step-item-head"><i class="layui-icon ' + icon + '"></i></div>';
                } else {
                    temp += '<div class="step-item-head step-item-head-active"><i class="layui-icon">' + (parseInt(i) + 1) + '</i></div>';
                }
                temp += '<div class="step-item-main"><div class="step-item-main-title">' + data[i].title + '</div><div class="step-item-main-desc">' + data[i].desc + '</div></div></div>';

                html += temp;
            }
            $(ele).append(html);
        }
    };
    $.fn[stepName] = function (options) {   //向jQuery注册插件
        var e = this;
        e.each(function () {
            $.data(e, "step_" + stepName, new step(this, options));
        });
        return e;
    };
})(jQuery, window, document);
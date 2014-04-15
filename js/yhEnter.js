/**
 * 隐患录入js
 * Created by Administrator on 2014/4/2.
 */

var serverPath = "http://192.168.1.105:8080/DataService/";
var mainDeptId;

/**
 * 初始化隐患级别
 */
function initYhLevel() {
    $.ajax({
        url: serverPath + "baseInfo/41",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhLevel",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhLevelSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 初始化隐患类型
 */
function initYhType() {
    $.ajax({
        url: serverPath + "baseInfo/1",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhType",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhTypeSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 初始化排查人员（登录人员）
 */
function initPcPerson() {
    $.ajax({
        url: serverPath + "yhEnter/pcPerson",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "pcPerson",
        success: function (data) {
            if (data != undefined && data != null && data != "null") {
//                alert(data.personNumber + "," + data.personName);
                $("#pcPersonNumber").val(data.personNumber);
                $("#pcPersonName").val(data.personName);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 初始化隐患专业
 */
function initYhzy() {
    $.ajax({
        url: serverPath + "baseInfo/116",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhzy",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhzySelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 根据输入的部门编码查询隐患依据、危险源、责任单位、排查地点
 */
function getYhBasis() {
    var deptNumber = $("#deptNumber").val();

    if (deptNumber == undefined || deptNumber == null || deptNumber == "") {
        alert("请输入部门编码！");
        return;
    }

    mainDeptId = deptNumber;

    // 查询隐患依据
    $.ajax({
        url: serverPath + "yhEnter/yhBasis/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhBasis",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhBasisSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].yhId + "'>" + data[i].yhContent + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);

                // 根据选中的隐患依据，初始化隐患级别
                $.ajax({
                    url: serverPath + "yhEnter/yhBasisLevel/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "yhBasisLevel",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#yhLevelSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                // 根据选中的隐患依据，初始化隐患类型
                $.ajax({
                    url: serverPath + "yhEnter/yhBasisType/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "yhBasisType",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#yhTypeSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                // 根据选中的隐患依据，初始化危险源
                $.ajax({
                    url: serverPath + "yhEnter/basisHazard/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "basisHazard",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#hazardSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                var selectText = select.find("option:selected").text();
                $("#yhContent").val(selectText);
            } else {
                alert("没有数据！");
            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 查询危险源
    $.ajax({
        url: serverPath + "yhEnter/hazard/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "hazard",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#hazardSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].hNumber + "'>" + data[i].hContent + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 查询责任单位
    $.ajax({
        url: serverPath + "yhEnter/zrdw/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "zrdw",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#zrdwSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].deptNumber + "'>" + data[i].deptName + "</option>";

                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);

                // 根据选中的责任单位初始化责任人
                $.ajax({
                    url: serverPath + "yhEnter/zrr/deptId/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "zrr",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#zrrSelect");
                            select.html("");
                            var selectStr = "";
                            for (var i = 0; i < data.length; i++) {
                                selectStr += "<option value='" + data[i].personNumber + "'>" + data[i].name + "</option>";

                            }
                            $(selectStr).appendTo(select);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });
            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 查询排查地点
    $.ajax({
        url: serverPath + "yhEnter/place/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "place",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#placeSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].placeid + "'>" + data[i].placename + "</option>";

                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 根据选择的隐患依据初始化隐患级别、隐患类型、危险源
 * @param selectVal 选中的隐患依据
 */
function selectBasis(selectVal) {
//    alert(selectVal.options[selectVal.selectedIndex].text);
    var selectText = selectVal.options[selectVal.selectedIndex].text;

    // 初始化隐患级别
    $.ajax({
        url: serverPath + "yhEnter/yhBasisLevel/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhBasisLevel",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhLevelSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 初始化隐患类型
    $.ajax({
        url: serverPath + "yhEnter/yhBasisType/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhBasisType",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhTypeSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 初始化危险源
    $.ajax({
        url: serverPath + "yhEnter/basisHazard/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "basisHazard",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#hazardSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    $("#yhContent").val(selectText);
}

/**
 * 根据选择的责任单位初始化责任人
 * @param selectVal 选中的责任单位
 */
function selectZrdw(selectVal) {
//    alert(selectVal.value);

    // 初始化责任人
    $.ajax({
        url: serverPath + "yhEnter/zrr/deptId/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "zrr",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#zrrSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].personNumber + "'>" + data[i].name + "</option>";

                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 当选择的排查类型为矿专项检查或公司专项检查时，显示隐患专业div
 * @param selectVal 选中的排查类型
 */
function selectPcType(selectVal) {
    if (selectVal.value == 4 || selectVal.value == 7) {
        // 显示隐患专业div
        $("#yhzyDiv").show();
    } else {
        // 隐藏隐患专业div
        $("#yhzyDiv").hide();
    }
}

/**
 * 当选择的整改方式为新增时，显示限期整改div
 * @param selectVal 选中的整改方式
 */
function selectZgfs(selectVal) {
    if (selectVal.value == "新增") {
        // 显示限期整改div
        $("#xqzgDiv").show();
    } else {
        // 隐藏限期整改div
        $("#xqzgDiv").hide();
    }
}

/**
 * 提交隐患信息，插入数据库
 */
function submitInfo() {
    if (confirm("确认提交？")) {
        var yhyj = $("#yhBasisSelect").val();   // 隐患依据
        var yhjb = $("#yhLevelSelect").val();   // 隐患级别
        var yhlx = $("#yhTypeSelect").val();    // 隐患类型
        var wxy = $("#hazardSelect").val();     // 危险源
        var yhms = $("#yhContent").val();       // 隐患描述
        var zrdw = $("#zrdwSelect").val();      // 责任单位
        var zrr = $("#zrrSelect").val();        // 责任人
        var pcdd = $("#placeSelect").val();     // 排查地点
        var mxdd = $("#placeDetail").val();     // 明细地点
        var pcsj = $("#pcTime").val();          // 排查时间
        var pcbc = $("#pcbc").val();            // 排查班次
        var pcry = $("#pcPersonNumber").val();  // 排查人员
        var pclx = $("#pcType").val();          // 排查类型
        var yhzy = $("#yhzySelect").val();      // 隐患专业
        var zgfs = $("#zgfs").val();            // 整改方式
        var zgqx = $("#zgqx").val();            // 整改期限
        var zgbc = $("#zgbcSelect").val();      // 整改班次

        if (yhms == undefined || yhms == null || yhms == "") {
            alert("请填写隐患描述！");
            return;
        }
        if (pcsj == undefined || pcsj == null || pcsj == "") {
            alert("请填写排查时间！");
            return;
        }
        if (pcry == undefined || pcry == null || pcry == "") {
            alert("排查人员无法获取，请登录！");
            return;
        }

        if (mxdd == undefined || mxdd == null || mxdd == "") {
            mxdd = "null";
        }
        if (zgqx == undefined || zgqx == null || zgqx == "") {
            zgqx = "null";
        }


        /* alert("yhyj = " + yhyj + ", yhjb = " + yhjb + ", yhlx = " + yhlx + ", wxy = " + wxy + ", yhms = " + yhms + ", zrdw = " + zrdw + ", zrr = " + zrr
         + ", pcdd = " + pcdd + ", mxdd = " + mxdd + ", pcsj = " + pcsj + ", pcbc = " + pcbc + ", pcry = " + pcry + ", pclx = " + pclx
         + ", yhzy = " + yhzy + ", zgfs = " + zgfs + ", zgqx = " + zgqx + ", zgbc = " + zgbc);*/

        $.ajax({
            url: serverPath + "yhEnter/insertInfo/" + yhyj + "/" + yhjb + "/" + yhlx + "/" + wxy + "/" + yhms + "/" + zrdw + "/" + zrr + "/" + pcdd + "/" + mxdd + "/" + pcsj + "/" + pcbc + "/" + pcry + "/" + pclx + "/" + zgfs + "/" + zgqx + "/" + zgbc + "/" + yhzy + "/" + mainDeptId,
            dataType: "jsonp",
            type: "post",
            jsonpCallback: "insertInfo",
            success: function (data) {
                if (data == "success") {
                    alert("录入成功！")
                } else {
                    alert("录入失败！");
                }
            },
            error: function () {
                alert("error!");
            }
        });
    }
}

/**
 * 过滤隐患依据
 */
function filterYhyj() {
    // 过滤条件
    var arg = $("#yhyjFilter").val();
    if (arg == undefined || arg == null || arg == "") {
        return;
    }

    // 从后台取得过滤之后的隐患依据列表
    $.ajax({
        url: serverPath + "yhEnter/yhBasis/deptNumber/" + mainDeptId + "/" + arg,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhBasis",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhBasisSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].yhId + "'>" + data[i].yhContent + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);

                // 根据选中的隐患依据初始化隐患级别
                $.ajax({
                    url: serverPath + "yhEnter/yhBasisLevel/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "yhBasisLevel",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#yhLevelSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                // 根据选中的隐患依据初始化隐患类型
                $.ajax({
                    url: serverPath + "yhEnter/yhBasisType/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "yhBasisType",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#yhTypeSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                // 根据选中的隐患依据初始化危险源
                $.ajax({
                    url: serverPath + "yhEnter/basisHazard/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "basisHazard",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#hazardSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                var selectText = select.find("option:selected").text();
                $("#yhContent").val(selectText);
            } else {
                alert("没有数据！");
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 过滤危险源
 */
function filterHazard() {
    // 过滤条件
    var arg = $("#hazardFilter").val();
    if (arg == undefined || arg == null || arg == "") {
        return;
    }

    $.ajax({
        url: serverPath + "yhEnter/hazard/deptNumber/" + mainDeptId + "/" + arg,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "hazard",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#hazardSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].hNumber + "'>" + data[i].hContent + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 过滤地点
 */
function filterPlace() {
    // 过滤条件
    var arg = $("#placeFilter").val();
    if (arg == undefined || arg == null || arg == "") {
        return;
    }

    $.ajax({
        url: serverPath + "yhEnter/place/deptNumber/" + mainDeptId + "/" + arg,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "place",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#placeSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].placeid + "'>" + data[i].placename + "</option>";

                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./alter", "./create", "./select", "./delete", "./update", "./insert", "./command", "./exec", "./expr", "./limit", "./show", "./analyze", "./with", "./util"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./alter"), require("./create"), require("./select"), require("./delete"), require("./update"), require("./insert"), require("./command"), require("./exec"), require("./expr"), require("./limit"), require("./show"), require("./analyze"), require("./with"), require("./util"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.alter, global.create, global.select, global._delete, global.update, global.insert, global.command, global.exec, global.expr, global.limit, global.show, global.analyze, global._with, global.util);
    global.union = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _alter, _create, _select, _delete, _update, _insert, _command, _exec, _expr, _limit2, _show, _analyze, _with, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.bigQueryToSQL = bigQueryToSQL;
  _exports.multipleToSQL = multipleToSQL;
  _exports.unionToSQL = unionToSQL;
  const typeToSQLFn = {
    alter: _alter.alterToSQL,
    analyze: _analyze.analyzeToSQL,
    attach: _analyze.attachToSQL,
    create: _create.createToSQL,
    select: _select.selectToSQL,
    deallocate: _command.deallocateToSQL,
    delete: _delete.deleteToSQL,
    exec: _exec.execToSQL,
    update: _update.updateToSQL,
    insert: _insert.insertToSQL,
    drop: _command.commonCmdToSQL,
    truncate: _command.commonCmdToSQL,
    replace: _insert.insertToSQL,
    declare: _command.declareToSQL,
    use: _command.useToSQL,
    rename: _command.renameToSQL,
    call: _command.callToSQL,
    desc: _command.descToSQL,
    set: _command.setVarToSQL,
    lock: _command.lockUnlockToSQL,
    unlock: _command.lockUnlockToSQL,
    show: _show.showToSQL
  };

  function unionToSQL(stmt) {
    const fun = typeToSQLFn[stmt.type];
    const res = [fun(stmt)];
    const {
      _orderby,
      _limit
    } = stmt;

    while (stmt._next) {
      const unionKeyword = (0, _util.toUpper)(stmt.set_op);
      res.push(unionKeyword, fun(stmt._next));
      stmt = stmt._next;
    }

    res.push((0, _expr.orderOrPartitionByToSQL)(_orderby, 'order by'), (0, _limit2.limitToSQL)(_limit));
    return res.filter(_util.hasVal).join(' ');
  }

  function bigQueryToSQL(stmt) {
    const {
      with: withExpr,
      parentheses,
      select,
      orderby,
      limit
    } = stmt;
    const result = [(0, _with.withToSQL)(withExpr), parentheses && '(', unionToSQL(select), parentheses && ')']; // process with, orderby and limit

    result.push((0, _expr.orderOrPartitionByToSQL)(orderby, 'order by'), (0, _limit2.limitToSQL)(limit));
    return result.filter(val => val).join(' ');
  }

  typeToSQLFn.bigquery = bigQueryToSQL;

  function multipleToSQL(stmt) {
    const res = [];

    for (let i = 0, len = stmt.length; i < len; ++i) {
      const astInfo = stmt[i] && stmt[i].ast ? stmt[i].ast : stmt[i];
      res.push(unionToSQL(astInfo));
    }

    return res.join(' ; ');
  }
});
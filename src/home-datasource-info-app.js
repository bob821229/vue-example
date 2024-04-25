export default {
  data() {
    return {
      tableData: [],
      $table: null,
    };
  },
  methods: {
    init: function () {
      axios
        .get("/content/data/menuDataSourceList.json")
        .then((response) => {
          // handle success
          //console.log(response);
          this.tableData = response.data;
          this.bindTable();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    bindTable() {
      $("#datasource-table").bootstrapTable({
        columns: [
          {
            title: "模組",
            field: "parentMenu",
          },
          {
            title: "功能",
            field: "menu",
          },
          {
            title: "資料名稱",
            field: "dataName",
          },
          {
            title: "資料來源",
            field: "dataSource",
          },
        ],
        data: this.tableData,
        onPostBody: (d) => {
          //console.log(d);
          let mergeCompare = {
            parentMenu: {
              pre: null,
              mergeIdx: 0,
              mergeRows: 0,
              list: [],
            },
            menu: {
              pre: null,
              mergeIdx: 0,
              mergeRows: 0,
              list: [],
            },
          };
          d.forEach((r, idx) => {
            this.compareMenu(mergeCompare, "parentMenu", r.parentMenu, idx);
            this.compareMenu(mergeCompare, "menu", r.menu, idx);
          });

          this.flushMergeInfo(mergeCompare, "parentMenu");
          this.flushMergeInfo(mergeCompare, "menu");

          console.log(mergeCompare);
          this.mergeRows(mergeCompare, "menu");
          this.mergeRows(mergeCompare, "parentMenu");
          //   $("#datasource-table").bootstrapTable("mergeCells", {
          //     index: 0,
          //     field: "parentMenu",
          //     colspan: 0,
          //     rowspan: 3,
          //   });
        },
      });
    },
    compareMenu(obj, field, currentFieldValue, dataRowIdx) {
      if (obj[field].pre != null && obj[field].pre != currentFieldValue) {
        //flush
        this.flushMergeInfo(obj, field);
        obj[field].mergeIdx = dataRowIdx;
        obj[field].mergeRows = 0;
      }
      obj[field].mergeRows++;
      obj[field].pre = currentFieldValue;
    },
    flushMergeInfo(obj, field) {
      obj[field].list.push({
        idx: obj[field].mergeIdx,
        rowspan: obj[field].mergeRows,
      });
    },
    mergeRows(obj, field) {
      obj[field].list.forEach((data, idx) => {
        $("#datasource-table").bootstrapTable("mergeCells", {
          index: data.idx,
          field: field,
          colspan: 1,
          rowspan: data.rowspan,
        });
      });
    },
    download(){
      $('#datasource-table').tableExport({
        fileName: '資料來源',
        type:'excel'});
    }, 
  },
  mounted() {
    this.init();
  },
  template: `
    
          <div @click="download"><i class="ti ti-table-down"></i></div>
          <table id="datasource-table" class="table table-bordered border-primary">
              <thead>
                  <tr class="text-center">

                  </tr>
              </thead>
              <tbody>
              </tbody>
          </table>
    
    
    `,
};

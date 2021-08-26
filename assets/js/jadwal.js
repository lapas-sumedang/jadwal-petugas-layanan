$(document).ready(function () {
  var table;
  getData();
});
$("#month").on("change", function () {
  table.ajax.reload();
});
function getData() {
  table = $("#table_1").DataTable({
    processing: true,
    serverSide: true,
    info: false,
    searching: false,
    order: [],
    pageLength: -1,
    paging: false,
    lengthChange: false,

    scrollX: true,

    ajax: {
      url: "https://www.radhiansobarna.com/api/elsa/getdata",
      type: "POST",
      data: function (data) {
        data.filterDate = $("#month").val();
      },
    },

    // drawCallback: function () {
    //   $(".dataTables_paginate > .pagination a").addClass("bg-dark-theme border-theme shadow-sm mt-4 text-theme");
    //   $(".dataTables_paginate > .pagination .active a").addClass("border-theme-active");
    // },

    columnDefs: [
      {
        targets: [8],
        orderable: false,
        visible: false,
      },
      {
        targets: [7],
        orderable: false,
      },
      {
        targets: [6],
        orderable: false,
      },
      {
        targets: [5],
        orderable: false,
      },
      {
        targets: [4],
        orderable: false,
      },
      {
        targets: [3],
        orderable: false,
      },
      {
        targets: [2],
        orderable: false,
      },
    ],
  });

  // $('div.dataTables_filter input').addClass('bg-dark-theme border-theme-active shadow-sm text-theme');
  // $('div.dataTables_length select').addClass('bg-dark-theme border-theme-active shadow-sm text-theme');
  // $('div.dataTables_filter').addClass('text-theme');
  // $('div.dataTables_length').addClass('text-theme');
  // $('div.dataTables_info').addClass('text-theme');
  // $('div.dataTables_paginate').addClass('mb-4');
}

$(document).ready(function () {
  var table;
  getData();

  $(".datepicker").datepicker({
    autoclose: true,
    format: "yyyy-mm-dd",
  });
});

$("#month").on("change", function () {
  table.ajax.reload();
});

function getData() {
  table = $("#table_1").DataTable({
    processing: true,
    serverSide: true,
    info: true,
    order: [],
    pageLength: 10,

    lengthChange: true,

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
        targets: [6],
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

function detailData(id) {
  var base_url = "https://www.radhiansobarna.com/api/elsa/tugaspelayanan/getData";
  disable();
  $.ajax({
    type: "POST",
    data: "id=" + id,
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      $("#idplk").val(hasil[0].plk_id);
      $("#tglU").val(hasil[0].plk_tgl);
      $("#plpmU").val(hasil[0].plk_plpm);
      $("#dlU").val(hasil[0].plk_dl);
      $("#puU").val(hasil[0].plk_pu);
      $("#pmU").val(hasil[0].plk_pm);
      enable();
      document.body.style.paddingRight = "0px";
    },
  });
}

function proses_tambah() {
  let tgl = $("#tgl").val();
  let plpm = $("#plpm").val();
  let dl = $("#dl").val();
  let pu = $("#pu").val();
  let pm = $("#pm").val();
  loadingklik();
  disable();
  if (tgl == "") {
    pesan("Oops..", "Tanggal harus di isi!", "warning");
  } else {
    var postForm = {
      tgl: tgl,
      plpm: plpm,
      dl: dl,
      pu: pu,
      pm: pm,
    };
    $.ajax({
      url: "https://www.radhiansobarna.com/api/elsa/tugaspelayanan/proses_tambah",
      type: "POST",
      data: postForm,
      dataType: "json",
      success: function (hasil) {
        console.log(hasil.pesan);
        if (hasil.pesan == "success") {
          pesan("Berhasil..", "Data berhasil ditambah.", "success");
          hapusForm();
          document.body.style.paddingRight = "0px";
          $("#exampleModal").modal("toggle");
          table.ajax.reload();
          enable();
        } else {
          pesan("Oops..", "Data gagal ditambah.", "warning");
          enable();
          document.body.style.paddingRight = "0px";
        }
      },
    });
  }
}

function proses_ubah() {
  let idplk = $("#idplk").val();
  let tgl = $("#tglU").val();
  let plpm = $("#plpmU").val();
  let dl = $("#dlU").val();
  let pu = $("#puU").val();
  let pm = $("#pmU").val();
  loadingklik();
  disable();
  if (tgl == "") {
    pesan("Oops..", "Tanggal harus di isi!", "warning");
  } else {
    var postForm = {
      idplk: idplk,
      tgl: tgl,
      plpm: plpm,
      dl: dl,
      pu: pu,
      pm: pm,
    };
    $.ajax({
      url: "https://www.radhiansobarna.com/api/elsa/tugaspelayanan/proses_ubah",
      type: "POST",
      data: postForm,
      dataType: "json",
      success: function (hasil) {
        console.log(hasil.pesan);
        if (hasil.pesan == "success") {
          pesan("Berhasil..", "Data berhasil diubah.", "success");
          hapusForm();
          enable();
          document.body.style.paddingRight = "0px";
          $("#exampleModalU").modal("toggle");
          table.ajax.reload();
        } else {
          pesan("Oops..", "Data gagal diubah.", "warning");
          enable();
          document.body.style.paddingRight = "0px";
        }
      },
    });
  }
}

function proses_hapus(id) {
  var postForm = {
    id: id,
  };
  $.ajax({
    url: "https://www.radhiansobarna.com/api/elsa/tugaspelayanan/proses_hapus",
    type: "POST",
    data: postForm,
    dataType: "json",
    success: function (hasil) {
      console.log(hasil.pesan);
      if (hasil.pesan == "success") {
        pesan("Berhasil..", "Data berhasil dihapus.", "success");
        table.ajax.reload();
        document.body.style.paddingRight = "0px";
      } else {
        pesan("Oops..", "Data gagal dihapus.", "warning");
        document.body.style.paddingRight = "0px";
      }
    },
  });
}

function hapusData(id) {
  swal
    .fire({
      title: "Hapus Data ini?",
      icon: "warning",
      closeOnClickOutside: false,
      showCancelButton: true,
      confirmButtonText: "Iya",
      confirmButtonColor: "#198754",
      cancelButtonText: "Batal",
      cancelButtonColor: "#d33",
    })
    .then((result) => {
      if (result.value) {
        loadingklik();
        proses_hapus(id);
      }
    });
}

function pesan(judulpesan, pesan, icon) {
  swal.fire({
    title: judulpesan,
    text: pesan,
    icon: icon,
    confirmButtonColor: "#198754",
  });
}

function hapusForm() {
  let tgl = $("#tgl");
  let plpm = $("#plpm");
  let dl = $("#dl");
  let pu = $("#pu");
  let pm = $("#pm");
  let idplk = $("#idplk");
  let plpmU = $("#plpmU");
  let dlU = $("#dlU");
  let puU = $("#puU");
  let pmU = $("#pmU");

  tgl.val("");
  idplk.val("");
  plpm.val("");
  dl.val("");
  pu.val("");
  pm.val("");
  plpmU.val("");
  dlU.val("");
  puU.val("");
  pmU.val("");
}

function loadingklik() {
  Swal.fire({
    title: "Memuat...",
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
  });
}

function disable() {
  $("#bSubmit").hide();
  $("#bSubmitDisable").show();
}

function enable() {
  $("#bSubmit").show();
  $("#bSubmitDisable").hide();
}

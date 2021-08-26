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

    columnDefs: [
      {
        targets: [6],
        orderable: false,
      },
    ],
  });
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
      $("#plpmU").val(petugas1(hasil[0].plk_plpm));
      $("#plpm2U").val(petugas2(hasil[0].plk_plpm));
      $("#dlU").val(hasil[0].plk_dl);
      $("#puU").val(hasil[0].plk_pu);
      $("#pmU").val(hasil[0].plk_pm);
      $("#pengawaskU").val(hasil[0].plk_pengawas_k);
      $("#petugaskU").val(hasil[0].plk_petugas_k);
      enable();
      document.body.style.paddingRight = "0px";
    },
  });
}

function petugas1(data) {
  var explode = data.split(",");
  return explode[0];
}

function petugas2(data) {
  var explode = data.split(",");
  return explode[1];
}

function proses_tambah() {
  let tgl = $("#tgl").val();
  let plpm1 = $("#plpm").val();
  let plpm2 = $("#plpm2").val();
  let dl = $("#dl").val();
  let pu = $("#pu").val();
  let pm = $("#pm").val();
  let pengawask = $("#pengawask").val();
  let petugask = $("#petugask").val();
  let plpm = plpm1 + "," + plpm2;

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
      pengawask: pengawask,
      petugask: petugask,
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
  let plpm1 = $("#plpmU").val();
  let plpm2 = $("#plpm2U").val();
  let dl = $("#dlU").val();
  let pu = $("#puU").val();
  let pm = $("#pmU").val();
  let pengawask = $("#pengawaskU").val();
  let petugask = $("#petugaskU").val();
  let plpm = plpm1 + "," + plpm2;
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
      pengawask: pengawask,
      petugask: petugask,
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
  let plpm2 = $("#plpm2");
  let dl = $("#dl");
  let pu = $("#pu");
  let pm = $("#pm");
  let pengawask = $("#pengawask");
  let petugask = $("#petugask");
  let idplk = $("#idplk");
  let plpmU = $("#plpmU");
  let plpm2U = $("#plpm2U");
  let dlU = $("#dlU");
  let puU = $("#puU");
  let pmU = $("#pmU");
  let pengawaskU = $("#pengawaskU");
  let petugaskU = $("#petugaskU");

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
  plpm2.val("");
  plpm2U.val("");
  pengawask.val("");
  pengawaskU.val("");
  petugask.val("");
  petugaskU.val("");
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

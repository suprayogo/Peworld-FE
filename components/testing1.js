<div className="container content-to-center mt-5">
<div className="row justify-content-between align-items-center">
  <div className="col-md-5 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center order-2 order-md-1">
    <h1 className="d-block mb-3 mt-3">
      Talenta terbaik negeri untuk perubahan revolusi 4.0
    </h1>
    <p className="d-block mb-3"></p>
    <div class="button-container">
      <Link href="#">
        <button
          class="btn btn-primary btn-lg"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Mulai Dari Sekarang"}
        </button>
      </Link>
    </div>
  </div>
  <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 order-1 order-md-2 mt-1">
    <div className="box-gray"></div>
    <img
      src="/home-img-1.png"
      alt="Home Picture"
      className="responsive-image"
    />
  </div>
</div>
</div>
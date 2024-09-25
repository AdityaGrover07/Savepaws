export default function Message({ type, text, image, name, time }) {
  const send = (
    <div
      className=" w-50 d-flex align-items-center ms-auto bg-light p-2 my-2 "
      style={{ borderRadius: "30px" }}
    >
      <div>
        <img
          type="button"
          data-bs-toggle="dropdown"
          src={` https://paws-adoption.s3.ap-south-1.amazonaws.com/users/${image}.jpeg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg";
          }}
          width="55"
          height="55"
          className="rounded-circle dropdown-toggle"
          alt="Placeholder profile pic"
        />
      </div>
      <div className=" text-left w-100 px-3">
        {text}
        <div>
          <h6 style={{ fontSize: "12px" }}>
            <i>You: {name} &nbsp; time</i>
          </h6>
        </div>
      </div>
    </div>
  );

  const receive = (
    <div
      className=" w-50 d-flex justify-content-end align-items-center bg-light p-2 my-2 "
      style={{ borderRadius: "30px" }}
    >
      <div>
        <img
          type="button"
          data-bs-toggle="dropdown"
          src={` https://paws-adoption.s3.ap-south-1.amazonaws.com/users/${image}.jpeg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg";
          }}
          width="55"
          height="55"
          className="rounded-circle dropdown-toggle"
          alt="Placeholder profile pic"
        />
      </div>
      <div className=" text-left w-100 px-3">
        {text}
        <div>
          <h6 style={{ fontSize: "12px" }}>
            <i>{name} &nbsp; time</i>
          </h6>
        </div>
      </div>
    </div>
  );
  return type === "send" ? send : receive;
}

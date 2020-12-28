const config = {
  STRIPE_KEY: "pk_test_x4KSpqp8mUWGP8ounZ4tbF5P001esQ3PfI",
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
    BUCKET: "paintingsbucket",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://z6m4kc8fs4.execute-api.us-east-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_8VNgKvAPh",
    APP_CLIENT_ID: "5rdv8jhmgmivodiach0g39np1o",
    IDENTITY_POOL_ID: "us-east-2:e963538c-6244-4e03-b46b-6046a1851d1c",
  },
};

export default config;

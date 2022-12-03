class ApiError extends Error {
    constructor(status, message) {
      super(message);
      this.message = message || 'Something went wrong';
      this.status = status || 500;
    }
    // constructor(options = {}) {
    //   this.status = options.status;
    //   this.name = options.name;
    //   this.message = options.message ?? {};
    //   this.data = options.data ?? {};
    //   this.accessToken = options.accessToken ?? null;
    // }
    // constructor(option) {
    //   this.status = options.status || 500;
    //   this.message = options.message ?? {};
    //   this.data = options.data ?? {};
    //   this.accessToken = options.accessToken ?? null;
    // }
  
    static badRequest(message) {
      ApiError.status = 400;
      ApiError.message = message || 'Bad request.';
      return new ApiError(this.status, this.message);
    }
  
    static intervalServerError(message) {
      ApiError.status = 500;
      ApiError.message = message || 'Bad request.';
      return new ApiError(this.status, this.message);
    }

    static unAuthenticated(message) {
      ApiError.status = 401;
      ApiError.message = message || 'Invalid user.';
      return new ApiError(this.status, this.message);
    }

    static unAuthorized(message) {
      ApiError.status = 401;
      ApiError.message = message || 'Unauthorized user.';
      return new ApiError(this.status, this.message);
    }
  
    static notFoundError(message) {
      ApiError.status = 404;
      ApiError.message = message || 'Not found.';
      return new ApiError(this.status, this.message);
    }

    static conflict(message) {
      ApiError.status = 409;
      ApiError.message = message || 'Conflict.';
      return new ApiError(this.status, this.message);
    }

    static forbidden(message) {
      ApiError.status = 409;
      ApiError.message = message || 'Forbidden.';
      return new ApiError(this.status, this.message);
    }
  }
  
  module.exports = ApiError;
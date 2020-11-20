module Services
  require "typhoeus/adapters/faraday"

  class Base
    def initialize(**args)
      initialize_connection(**args)
    end

    def get(path)
      @connection.get(path)
    end

    def delete(path)
      @connection.delete(path)
    end

    def post(path, data)
      @connection.post(path, data)
    end

    def put(path, data = nil)
      @connection.put(path, data)
    end

    protected

    def initialize_connection(**args)
      raise StandardError, "Cannot initialize base server class"
    end
  end
end

import client from "../config/reddis";

const RATE_LIMIT_WINDOW = 3600;
const MAX_REQUESTS = 100;

//fixed window rate limiting implementation
const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const numberofRequests = await client.incr(ip); //incr method increments the number stored at key by one. If the key does not exist, it is set to 0 before performing the operation.

    if (numberofRequests > MAX_REQUESTS) {
      return res.status(429).json({ message: "Too Many Requests" });
    }

    if (numberofRequests === 1) {
      await client.expire(RATE_LIMIT_WINDOW);
    }

    next();

  } catch (err) {
    console.error("Rate Limiter Error", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// slide window rate limiting implementation
// const rateLimiter = async (req, res, next) => {
//   try {
//     const ip = req.ip;
//     const currentTime = Math.floor(Date.now() / 1000);
//     const windowStart = currentTime - RATE_LIMIT_WINDOW;

//     await client.zremrangebyscore(ip, 0, windowStart);

//     const requestCount = await client.zcard(ip);
//     if (requestCount >= MAX_REQUESTS) {
//       return res.status(429).json({ message: "Too Many Requests" });
//     }
    
//     await client.zadd(ip, currentTime, currentTime);
//     await client.expire(ip, RATE_LIMIT_WINDOW);
//     next();


//   } catch (err) {
//     console.error("Rate Limiter Error", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export default rateLimiter;

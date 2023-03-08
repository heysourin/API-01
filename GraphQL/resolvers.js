const nanoid = require("nanoid");
// import { nanoid } from "nanoid";

class Course {
  constructor(
    id,
    {
      //Things from courseName of schema
      courseName,
      category,
      price,
      language,
      email,
      stack,
      teachingAssists,
    }
  ) {
    this.id = id;
    this.courseName = courseName;
    this.category = category;
    this.price = price;
    this.language = language;
    this.email = email;
    this.stack = stack;
    this.teachingAssists = teachingAssists;
  }
}

const courseholder = {};

const resolvers = {
  //Methods of schema. name has to be exacctly the same
  getCourse: ({ id }) => {
    return new Course(id, courseholder[id]);
  },

  createCourse: ({ input }) => {
    let id = nanoid();
    courseholder[id] = input;
    return new Course(id, input);
  },
};

// export { resolvers };

import { format } from "date-fns";

class JobConverter {
  static industryMap = {
    Agriculture: "agriculture",
    "Banking and Finance": "banking_finance",
    "Building & Construction": "building_construction",
    "Business Development": "business",
    "Customer Service": "customer_service",
    Government: "government",
    Healthcare: "healthcare",
    "Hospitality and Leisure": "hospitality",
    "Human Resource": "human_resource",
    "IT and Software Development": "it_software",
    Legal: "legal",
    "Marketing & Communication": "marketing_communication",
    "Project and Product Management": "project_management",
    Teaching: "teaching",
  };

  static jobLevelMap = {
    Internship: "internship",
    "Entry-level": "entry_level",
    "Mid-level": "mid_level",
    "Senior-level": "senior_level",
  };

  static jobTypeMap = {
    Remote: "remote",
    "Full-time": "full_time",
    "Part-time": "part_time",
  };

  static toDbIndustry(value) {
    return this.industryMap[value] || "invalid_value";
  }

  static toHumanIndustry(value) {
    const reversedIndustryMap = Object.fromEntries(
      Object.entries(this.industryMap).map(([key, value]) => [value, key])
    );
    return reversedIndustryMap[value] || value;
  }

  static toDbJobLevel(value) {
    return this.jobLevelMap[value] || value;
  }

  static toHumanJobLevel(value) {
    const reversedJobLevelMap = Object.fromEntries(
      Object.entries(this.jobLevelMap).map(([key, value]) => [value, key])
    );
    return reversedJobLevelMap[value] || value;
  }

  static toDbJobType(value) {
    return this.jobTypeMap[value] || value;
  }

  static toHumanJobType(value) {
    const reversedJobTypeMap = Object.fromEntries(
      Object.entries(this.jobTypeMap).map(([key, value]) => [value, key])
    );
    return reversedJobTypeMap[value] || value;
  }

  static formatDate(timestamp) {
    const date = new Date(timestamp);
    return format(date, "do MMMM yyyy");
  }
}

export default JobConverter;

import { DateTime } from "luxon";

export default async function(eleventyConfig) {
	// Configure Eleventy

    eleventyConfig.setInputDirectory("base");

    eleventyConfig.setOutputDirectory("");
	
    eleventyConfig.addFilter("myDate", dateObj => {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLLL yyyy");
    });

    eleventyConfig.addFilter("testFilter", function(value) {value}
    );

};

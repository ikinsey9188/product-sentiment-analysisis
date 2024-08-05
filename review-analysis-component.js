import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Simulated dataset of product reviews
const reviewsData = [
  {
    date: "15-07-2023",
    product: "ZephyrBook Pro 2023",
    rating: 2,
    content: "Heating issues, poor customer support. Competitor's StarLite 2023 performs better."
  },
  {
    date: "20-07-2023",
    product: "LuminaFlex X1",
    rating: 4,
    content: "Great performance, good battery life. Suggestion: extend warranty period."
  },
  {
    date: "25-07-2023",
    product: "ZephyrBook Pro 2023",
    rating: 3,
    content: "Decent performance, but still some heating issues. Customer support has improved."
  },
  {
    date: "30-07-2023",
    product: "LuminaFlex X1",
    rating: 5,
    content: "Exceptional product. Outperforms competitors in every aspect."
  },
  {
    date: "05-08-2023",
    product: "ZephyrPhone 12",
    rating: 4,
    content: "Great camera, good battery life. UI could be more intuitive."
  }
];

// Function to analyze a single review
const analyzeReview = (review) => {
  const sentimentMap = {1: "Negative", 2: "Negative", 3: "Neutral", 4: "Positive", 5: "Positive"};
  
  return {
    date: review.date,
    product: review.product,
    rating: review.rating,
    summary: review.content.length > 100 ? review.content.substring(0, 97) + "..." : review.content,
    improvements: review.content.toLowerCase().includes("heating") ? ["Address heating issues"] : 
                  review.content.toLowerCase().includes("ui") ? ["Improve user interface"] : 
                  ["Continue current quality"],
    competitors: review.content.toLowerCase().includes("starlite") ? ["StarLite performs better"] : [],
    sentiment: sentimentMap[review.rating]
  };
};

// Component for displaying a single review analysis
const ReviewAnalysis = ({ review }) => (
  <div className="border p-4 mb-4 rounded">
    <h3 className="text-lg font-bold">{review.product}</h3>
    <p><strong>Date:</strong> {review.date}</p>
    <p><strong>Rating:</strong> {review.rating}/5</p>
    <p><strong>Summary:</strong> {review.summary}</p>
    <p><strong>Improvements:</strong> {review.improvements.join(", ")}</p>
    <p><strong>Competitors:</strong> {review.competitors.length ? review.competitors.join(", ") : "None mentioned"}</p>
    <p><strong>Sentiment:</strong> {review.sentiment}</p>
  </div>
);

// Main component
const EnhancedReviewAnalysisSystem = () => {
  const [analyzedReviews, setAnalyzedReviews] = useState([]);

  const analyzeAllReviews = () => {
    const analyzed = reviewsData.map(analyzeReview);
    setAnalyzedReviews(analyzed);
  };

  // Prepare data for visualization
  const chartData = analyzedReviews.reduce((acc, review) => {
    if (!acc[review.product]) {
      acc[review.product] = { name: review.product, avgRating: 0, count: 0 };
    }
    acc[review.product].avgRating += review.rating;
    acc[review.product].count += 1;
    return acc;
  }, {});

  Object.values(chartData).forEach(product => {
    product.avgRating = parseFloat((product.avgRating / product.count).toFixed(2));
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enhanced Review Analysis System</h1>
      <button 
        onClick={analyzeAllReviews}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Analyze Reviews
      </button>
      
      {analyzedReviews.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-2">Analysis Results</h2>
          {analyzedReviews.map((review, index) => (
            <ReviewAnalysis key={index} review={review} />
          ))}
          
          <h2 className="text-xl font-bold mt-6 mb-2">Product Ratings Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.values(chartData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgRating" fill="#8884d8" name="Average Rating" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default EnhancedReviewAnalysisSystem;

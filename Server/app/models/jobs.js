module.exports = mongoose => {
    const Job = mongoose.model(
        "job",
        mongoose.Schema({
            title: String,
            company: String,
            website: String, 
            date: Date,
            description: String,
            phone: String,
            email: String,
            keyword: String
        })
    );
    return Job;
};
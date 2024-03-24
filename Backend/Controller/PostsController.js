const Posts = require('../model/Posts');
const getAllPosts = async(req,res) =>
{
    const posts = await Posts.find();
    if(!posts) return res.status(204).json({'message' : 'No posts found'});
    res.json(posts);
}

const createNewPost = async(req,res) =>
{
    if(!req?.body?.title || !req?.body?.datetime || !req?.body?.body || !req?.file?.path) 
    {
        return res.status(400).json({'message' : 'Title  datetime and body are required'})
    }
     console.log(req.body.title);
     console.log(req.body.body);
     console.log(req.body.categoryId);
     console.log(req.file.path);
     //console.log(req);
    try{
        const result = await Posts.create({
            title : req.body.title ,
            datetime : req.body.datetime ,
            body : req.body.body,
            categoryId : req.body.categoryId,
            imageUrl : req.file.path,
            filename : req.file.originalname
         
        });

        res.status(201).json(result);
    }
    catch(err)
    {
        console.error(err);
    }
}

const updatePost = async(req,res) =>
{
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    console.log(req.body.title);
    console.log(req.body.body);
    console.log(req.file);

    const post = await Posts.findOne({_id : req.params.id}).exec();
    if(!post) return res.status(204).json({ "message": `No post matches ID ${req.body.id}.` });
     
    if(req.body?.title) post.title = req.body.title ;
    if(req.body?.datetime) post.datetime = req.body.datetime ;
    if(req.body?.body) post.body = req.body.body ;
    if(req.body?.categoryId) post.categoryId = req.body.categoryId
    if(req.file?.path) post.imageUrl = req.file.path 
    if(req.file?.originalname) post.filename = req.file.originalname
    //console.log(req.file);
    //console.log(req.file.originalname);

    const result = await post.save();
    res.json(result);

}

const deletePost = async(req,res) =>
{      
    
    if (!req?.params?.id) return res.status(400).json({ 'message': 'post ID required.' });
    
    const post = await Posts.findOne({_id : req.params.id}).exec();
    if(!post) 
    {
        return res.status(204).json({ "message": `No post matches ID ${req.body.id}.` });
    }
    const result = await post.deleteOne();
      res.json(result); 
}

const getPost = async(req,res) =>
{
    if (!req?.params?.id) return res.status(400).json({ 'message': 'post ID required.' });
    
    const post = await Posts.findOne({_id : req.params.id}).exec();
    if(!post) 
    {
        return res.status(204).json({ "message": `No post matches ID ${req.body.id}.` });
    }
    res.json(post);
}

module.exports ={
    getAllPosts ,
    createNewPost ,
    updatePost ,
    deletePost ,
    getPost
}

var express = require('express');
var router = express.Router();
const ejs=require('ejs');
// const Article = require('./models/article');
var bodyParse=require('body-parser');
const multer  = require('multer');
const T = require('tesseract.js');
const upload = multer({ dest: 'uploads/' });
const ObjectId=require('mongodb').ObjectId;
const Mongoclient=require('mongodb').MongoClient;
var mongojs = require('mongojs')
var cString="mongodb+srv://dharani:dharani@cluster0.5eegimc.mongodb.net/blog?retryWrites=true&w=majority"
var db = mongojs(cString, ['users','articles'])
router.post('/ecreate', upload.single('file'),async(req,res)=>{
    try{
        const id=req.body.eusername;
        console.log(id);
        const file=req.file;
    T.recognize(file.path, 'eng', { logger: m => console.log(m) })
  .then(out => {
     console.log(out);


     const regex = /vishnu/i ;

    if (regex.test(out.data.text)) {
        const UserJson={
            firstname:req.body.efname,
            lastname:req.body.elname,
            username:req.body.eusername,
            email:req.body.eemail,
            password:req.body.epassword,
           age:req.body.eage,
           gender:req.body.egender,
           Salutation:req.body.esalutation,
           city:req.body.ecity,
           state:req.body.estate,
           pincode:req.body.epincode,
           file:req.body.file

        }
        db.collection('users').insertOne(UserJson,function(err,collection){
            if(err){
                console.log(err);
            }
            else{
                console.log("success");
                res.render('ccreate')
            }
        })
    } else {
        // res.locals.customValidity = 'enter valid id card';
       res.render('oops')
        res.redirect('/expsignup1');
        // alert("enter valid id card! note:It should be visible clear");
    }
    });
   
    }
    catch(error){
        res.json("hii");
    }
});

// router.post('/upload',upload.single('file'),(req,res)=>{
//     const file=req.file;
//     T.recognize(file.path, 'eng', { logger: m => console.log(m) })
//   .then(out => {
//      console.log(out);


//      const regex = /vishnu/i ;

//     if (regex.test(out.data.text)) {
//     res.send("You are 'vishnu' student");
//     } else {
//     res.send("please enter valid college id. should visible clear");
//     }
//     });
   
    
// });


router.post('/agrSignIn1',async function(req,res){
    const id1 = req.body.agronomist_username;
    const id2 = req.body.agr_password;
    const userRef1 = db.collection("administrator");
   
    try{
      userRef1.findOne({ username: id1, password: id2 }, async function (error, doc) {
        if (doc) {
           //  res.render('allblogs');
        // console.log('user',doc);
        try{
            db.collection('articles').find().sort({_id:-1},(err,docs)=>{
                if(err){
                    throw err;
                }
                else{
                    var l = [];
                   
                    docs.forEach((ele)=>{
                        l.push({
                            id: ele._id,
                            user:ele.user,
                            title:ele.title,
                            image:ele.image,
                            description:ele.description,
                            markdown:ele.markdown,
                        });
                    });
                    res.render('allblogs',{l});
                    // console.log(l);
                }
            });
        }
        catch(error){
            res.json('hello got an error');
        }

        }
        else{
            res.send("incorrect details");
        }
      });
    } catch (error) {
        res.json('hello');
    }
});

router.post('/accept',async function(req,res){
      const id6=req.body.name;
      const id7=req.body.title;
      const id8=req.body.image;
      const id9=req.body.description;
      const id10=req.body.markdown;
try{
    const UserJson={
        user:id6,
        title:id7,
        image:id8,
        description:id9,
        markdown:id10
    }
    const response=db.collection("articles").insert(UserJson,(err,doc)=>{
        if(err)throw err;
        db.collection('userrequest').remove({title:id7},(err,doc)=>{
            if(err) throw err;
            console.log("accepted");
        try{
            db.collection('articles').find().sort({_id:-1},(err,docs)=>{
                if(err){
                    throw err;
                }
                else{
                    var l = [];
                   
                    docs.forEach((ele)=>{
                        l.push({
                            id:ele._id,
                            user:ele.user,
                            title:ele.title,
                            image:ele.image,
                            description:ele.description,
                            markdown:ele.markdown
                        });
                    });
                    res.render('allblogs',{l});
                    // console.log(l);
                }
            });
        }
        catch(error){
            res.json('hello got an error');
        }
    })
    });
}
catch(error){
    res.send("hello")
}

});


router.post('/requestpost',async function(req,res){
    try{
        db.collection('userrequest').find().sort({_id:-1},(err,docs)=>{
            if(err){
                throw err;
            }
            else{
                var l = [];
               
                docs.forEach((ele)=>{
                    l.push({
                        id: ele._id,
                        user:ele.user,
                        title:ele.title,
                        image:ele.image,
                        description:ele.description,
                        markdown:ele.markdown
                    });
                });
                res.render('request',{l});
                console.log(l);
            }
        });
    }
    catch(error){
        res.json('hello got an error');
    }
});


router.post('/userSignIn1',async function(req,res){
    const id1 = req.body.agronomist_username;
    const id2 = req.body.agr_password;
    const userRef1 = db.collection("users");
   
    try{
      userRef1.findOne({ username: id1, password: id2 }, async function (error, doc) {
        if (doc) {
           //  res.render('allblogs');
        // console.log('user',doc);
        try{
            db.collection('articles').find().sort({_id:-1},(err,docs)=>{
                if(err){
                    throw err;
                }
                else{
                    var l = [];
                   
                    docs.forEach((ele)=>{
                        l.push({
                            id: ele._id,
                            user:ele.user,
                            title:ele.title,
                            image:ele.image,
                            description:ele.description,
                            markdown:ele.markdown,
                        });
                    });
                    res.render('allblogs1',{l});
                    // console.log(l);
                }
            });
        }
        catch(error){
            res.json('hello got an error');
        }

        }
        else{
            res.send("incorrect details");
        }
      });
    } catch (error) {
        res.json('hello');
    }
});
router.post('/addition', async (req, res, next) => {
    //console.log(req);
    //req.article = new Article()
    next()
  }, saveArticleAndRedirectadmin('newblog'));

function saveArticleAndRedirectadmin(path) {
    return async (req, res) => {
        // console.log(req);
        const articledata = {
            user : req.body.user,
            title : req.body.title,
            image : req.body.image,
            description : req.body.description,
            markdown : req.body.markdown
        }
        // preprocess('newblog')
        try{
        db.collection('articles').insertOne(articledata,function(err,collection){
            if(err){
                console.log(err);
            }
            else{
                console.log("success");
                try{
                    db.collection('articles').find().sort({_id:-1},(err,docs)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            var l = [];
                           
                            docs.forEach((ele)=>{
                                l.push({
                                    id:ele._id,
                                    user:ele.user,
                                    title:ele.title,
                                    image:ele.image,
                                    description:ele.description,
                                    markdown:ele.markdown
                                });
                            });
                            res.render('allblogs',{l});
                            // console.log(l);
                        }
                    });
                }
                catch(error){
                    res.json('hello got an error');
                }
                
                // res.render(`${articledata.title}`)
            }
        });
    }
    catch(e){
        try{
            db.collection('articles').find().sort({_id:-1},(err,docs)=>{
                if(err){
                    throw err;
                }
                else{
                    var l = [];
                   
                    docs.forEach((ele)=>{
                        l.push({
                            id:ele._id,
                            user:ele.user,
                            title:ele.title,
                            image:ele.image,
                            description:ele.description,
                            markdown:ele.markdown,
                        });
                    });
                    res.render('allblogs',{l});
                    // console.log(l);
                }
            });
        }
        catch(error){
            res.json('hello got an error');
        }
    }
    }
}


router.post('/add1', async (req, res, next) => {
    //console.log(req);
    //req.article = new Article()
    next()
  }, saveArticleAndRedirectuser('usernblog'));

function saveArticleAndRedirectuser(path) {
    return async (req, res) => {
        // console.log(req);
        const articledat = {
            user : req.body.user,
            title : req.body.title,
            image : req.body.image,
            description : req.body.description,
            markdown : req.body.markdown
        }
        // preprocess('newblog')
        try{
        db.collection('userrequest').insertOne(articledat,function(err,collection){
            if(err){
                console.log(err);
            }
            else{
                console.log("success");
                res.send("requested successfully!!");
                
                // res.render(`${articledata.title}`)
            }
        });
    }
    catch(e){
        try{
            db.collection('articles').find().sort({_id:-1},(err,docs)=>{
                if(err){
                    throw err;
                }
                else{
                    var l = [];
                   
                    docs.forEach((ele)=>{
                        l.push({
                            id:ele._id,
                            user:ele.user,
                            title:ele.title,
                            image:ele.image,
                            description:ele.description,
                            markdown:ele.markdown,
                        });
                    });
                    res.render('allblogs1',{l});
                    // console.log(l);
                }
            });
        }
        catch(error){
            res.json('hello got an error');
        }
    }
    }
}




router.get('/allblogs/:title',async (req,res,next)=>{
    // console.log(req);
    const art=req.params.title;
    //console.log(art);
    if(art==null){
        res.redirect('allblogs');
    }
    try{
    db.collection('articles').findOne({title: art},(err,doc)=>{
        if(err){
            res.json("go away");

        }
        else{
            if(doc){
                // res.send(doc);
                var m=[];
                    m.push({
                        user:doc.user,
                        title:doc.title,
                        image:doc.image,
                        markdown:doc.markdown
                    });
               
                res.render('show',{m});
                // console.log(m[0].user);

        }
    }
    });
}
    catch(error){
        res.json("hello");
    }

});

//delete implementation
// router.post('/delete', (req, res,next) => {
//     console.log(req);
//     const id=req.body.id;
//     db.collection('articles').deleteOne({ _id: id }, (err, result) => {
//         if (err) throw err;
//         // console.log('Deleted document with ID ${id}');
//         try{
//             db.collection('articles').find((err,docss)=>{
//                 if(err){
//                     throw err;
//                 }
//                 else{
//                     var l = [];
                   
//                     docss.forEach((ele)=>{
//                         l.push({
//                             id:ele._id,
//                             user:ele.user,
//                             title:ele.title,
//                             image:ele.image,
//                             description:ele.description,
//                             markdown:ele.markdown,
//                         });
//                     });
//                     res.redirect('allblogs',{l});
//                     // console.log(l);
//                 }
//             });
//         }
//         catch(error){
//             res.json('hello got an error');
//         }
//     });
//     // await Article.findByIdAndDelete(req.params.id)
//     // res.redirect('/allblogs');
// });
router.post('/allblogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.collection('articles').remove({ _id: new ObjectId(id) }, (err, result) => {
      if (err) {
        res.send("error");
      }
      try{
        db.collection('articles').find().sort({_id:-1},(err,docs)=>{
            if(err){
                throw err;
            }
            else{
                var l = [];
               
                docs.forEach((ele)=>{
                    l.push({
                        id:ele._id,
                        user:ele.user,
                        title:ele.title,
                        image:ele.image,
                        description:ele.description,
                        markdown:ele.markdown,
                    });
                });
                res.render('allblogs',{l});
                // console.log(l);
            }
        });
    }
    catch(error){
        res.json('hello got an error');
    }
    });
  });

  router.post('/requestpost/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.collection('userrequest').remove({ _id: new ObjectId(id) }, (err, result) => {
      if (err) {
        res.send("error");
      }
      try{
        db.collection('userrequest').find().sort({_id:-1},(err,docs)=>{
            if(err){
                throw err;
            }
            else{
                var l = [];
               
                docs.forEach((ele)=>{
                    l.push({
                        id:ele._id,
                        user:ele.user,
                        title:ele.title,
                        image:ele.image,
                        description:ele.description,
                        markdown:ele.markdown,
                    });
                });
                res.render('request',{l});
                // console.log(l);
            }
        });
    }
    catch(error){
        res.json('hello got an error');
    }
    });
  });


// router.post('/:id', async (req, res, next) => {
//     // const art=req.params.id;
     
//     next()

//   }, saveArticleAndRedirect('edit'));


router.get('/', function(req, res, next) {
    res.render('enter', { title: 'farm Management' });
  });
//   router.get('/edit', function(req, res, next) {
//     res.render('edit');
//   });
  router.get('/index', function(req, res, next) {
    res.render('index');
  });
  router.get('/show', function(req, res, next) {
    res.render('show');
  });

  
  router.get('/expsignup1',(req,res,next)=>{
    res.render('expsignup1')
    
})
router.get('/newblog', function(req, res, next) {
    res.render('newblog');
  });
  router.get('/usernblog', function(req, res, next) {
    res.render('usernblog');
  });
  router.get('/allblogs', function(req, res, next) {
    res.render('allblogs');
  });
  router.get('/logout' , function(req,res,next){
    res.redirect('index');
  })
  router.get('/contact1' , function(req,res,next){
    res.render('contact1');
  })
router.get('/agrSignIn',(req,res,next)=>{
    res.render('agrSignIn')
    
})
router.get('/userSignIn',(req,res,next)=>{
    res.render('userSignIn')
    
})
// router.get('/request',(req,res,next)=>{
//     res.render('request')
    
// })
router.post('/agrSignin',(req,res)=>{
    res.send("hello");
})

module.exports=router;

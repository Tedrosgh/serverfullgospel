const getIndex=(req, res)=>{
    res.render('index', {title: 'Express'});
    console.log('index');
};

export default getIndex;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { jsPDF } = require('jspdf');
const cors = require('cors');
const User = require('./models/User');
const Signup=require('./models/Signup')
const bcryptjs=require("bcryptjs")
const app = express();
const PORT = 5001;
 

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/smartcv', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const checkAndAddPage = (doc, yOffset) => {
  if (yOffset > 270) { 
    doc.addPage(); 
    return 20; 
  }
  return yOffset;
};

app.post("/user/signup",async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    const signup=await Signup.findOne({email})
    if(signup){
      return res.status(400).json({message:"Email already exists"})
    }

    const hashPassword=await bcryptjs.hash(password,10)

    const newSignup=new Signup({
      name:name,
      email:email,
      password:hashPassword,
    })

    await newSignup.save()

    res.status(201).json({message:"User Created Successfully"})

  } catch (error) {
    console.log("Error :",error.message)
    res.status(500).json({message:"Internal Server Error"})
  }
})

app.post("/user/login",async(req,res)=>{
 try {
  const {email,password}=req.body;
  const signup=await Signup.findOne({email})

  const isMatch=await bcryptjs.compare(password,signup.password)

  if(!signup || !isMatch){
    res.status(400).json({message:"Invalid Email or Password"})
  }
  else{
    res.status(200).json({message:"Login Successfull",
      signup:{
        _id:signup._id,
        name:signup.name,
        email:signup.email,
      }
  })
  }
 } catch (error) {
  console.log("Error :",error.message)
  res.status(400).json({message:"Invalid Email or Password"})
 }
})

app.post('/api/users', async (req, res) => {
  try {
    const { personal, education, experiences, projects, skills } = req.body;

    
    if (!personal || !education || !experiences || !projects || !skills) {
      return res.status(400).send('Missing required fields');
    }

   
    const newUser = new User({
      personal,
      education,
      experiences,
      projects,
      skills,
    });

    await newUser.save();

   
    const doc = new jsPDF();

  
    doc.setFillColor(255, 165, 0); 
    doc.rect(0, 10, 210, 30, 'F'); 
    doc.setTextColor(255, 255, 255); 

   
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(personal.name.toUpperCase(), 5, 30); 
   
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    const contactInfoY = 17;
    const contactInfoX = 80; 
    doc.text(`Email: ${personal.email}`, contactInfoX, contactInfoY);
    doc.text(`Phone: ${personal.phone}`, contactInfoX, contactInfoY + 5);
    doc.text(`Website: ${personal.website}`, contactInfoX, contactInfoY + 10);
    doc.text(`GitHub: ${personal.github}`, contactInfoX, contactInfoY + 15);
    doc.text(`Instagram: ${personal.instagram}`, contactInfoX, contactInfoY + 20);

    
    let currentYOffset = 70; 

   
    doc.setTextColor(0, 0, 0); 
    doc.setFillColor(230, 230, 230); 
    doc.rect(0, currentYOffset, 210, 10, 'F'); 
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('WORK HISTORY', 20, currentYOffset + 7);

    currentYOffset += 20; 

    experiences.forEach((exp, index) => {
      currentYOffset = checkAndAddPage(doc, currentYOffset); 
      doc.setFont('helvetica', 'bold');
      doc.text(`Role: ${exp.role}, Company: ${exp.company}`, 20, currentYOffset);
      doc.setFont('helvetica', 'normal');
      doc.text(`Description: ${exp.description}`, 20, currentYOffset + 7, { maxWidth: 170 });
      doc.setFont('helvetica', 'normal');
      doc.text(`Joining Date: ${exp.startdate}`, 20, currentYOffset + 14, { maxWidth: 170 });
      doc.setFont('helvetica', 'normal');
      doc.text(`Ending Date: ${exp.enddate}`, 20, currentYOffset + 21, { maxWidth: 170 });
      currentYOffset += 25;
    });

    
    currentYOffset += 20;
    currentYOffset = checkAndAddPage(doc, currentYOffset); 

  
    doc.setFillColor(240, 240, 240); 
    doc.rect(0, currentYOffset, 210, 10, 'F');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', 20, currentYOffset + 7);

    currentYOffset += 20; 

    education.forEach((edu, index) => {
      currentYOffset = checkAndAddPage(doc, currentYOffset); 
      doc.setFont('helvetica', 'bold');
      doc.text(`Degree: ${edu.degree}`, 20, currentYOffset);
      doc.setFont('helvetica', 'normal');
      doc.text(`Institution: ${edu.institution}, Year Of Graduating: ${edu.year}, Grade: ${edu.grade}`, 20, currentYOffset + 5, { maxWidth: 170 });
      currentYOffset += 20; 
    });

   
    currentYOffset += 20;
    currentYOffset = checkAndAddPage(doc, currentYOffset); 

   
    doc.setFillColor(230, 230, 230); 
    doc.rect(0, currentYOffset, 210, 10, 'F');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PROJECTS', 20, currentYOffset + 7); 

    currentYOffset += 20; 

    projects.forEach((project, index) => {
      currentYOffset = checkAndAddPage(doc, currentYOffset); 
      doc.setFont('helvetica', 'bold');
      doc.text(`Title: ${project.title}`, 20, currentYOffset);
      doc.setFont('helvetica', 'normal');
      doc.text(`Description: ${project.description}`, 20, currentYOffset + 5, { maxWidth: 170 });
      doc.text(`Link: ${project.link}`, 20, currentYOffset + 10); 
      currentYOffset += 30; 
    });

    
    currentYOffset += 20;
    currentYOffset = checkAndAddPage(doc, currentYOffset); 

    
    doc.setFillColor(240, 240, 240); 
    doc.rect(0, currentYOffset, 210, 10, 'F');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS', 20, currentYOffset + 7); 

    currentYOffset += 20;

    skills.forEach((skill, index) => {
      currentYOffset = checkAndAddPage(doc, currentYOffset); 
      doc.setFont('helvetica', 'normal');
      doc.text(`Skill: ${skill.skill} - Proficiency: ${skill.proficiency}`, 20, currentYOffset);
      currentYOffset += 15; 
    });


    const pdfOutput = doc.output('arraybuffer');


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(Buffer.from(pdfOutput));
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).send('Error generating resume: ' + error.message);
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import express, {Request, Response} from 'express';
import { jwtValidation } from '../auth/verifyToken';
import { createUser, logIn, profile } from '../auth/auth.controller';
import { getUsers, updateUser, deleteUser } from '../users/user.controller';
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from '../events/event.controller';
import {createEntity, getEntities, updateEntity, deleteEntity, printQR, downloadFile} from '../entities/entity.controller';
import {createDocument, deleteDocument, getDocuments, downloadDocument} from "../documents/document.controller";
import { createBusiness, deleteBusiness, getBusiness, updateBusiness } from '../business/business.controller';
import { createProjects, deleteProject, getProjects, updateProject } from '../projects/projects.controller';
import { createFollow, getFollows, deleteFollow } from '../follows/follow.controller';
import multer from '../config/multer';



const router = express.Router();

/*Welcome*/
router.get('/', async(req: Request, res: Response) => {res.send('Insta Check API')});

/*Entities*/
router.post('/entity', createEntity);
router.get('/entity', getEntities);
router.get('/entity/:id', getEntities);
router.put('/entity/:id', updateEntity);
router.delete('/entity/:id', deleteEntity);
router.get('/entityQR/:name', downloadFile);
router.post('/entityQR/:id', printQR);

/*Users*/
router.post('/user', createUser); //adding a user
router.post('/login', logIn); //login authentication
router.get('/profile', jwtValidation, profile); //return the profile about the logged user (protected route)
router.get('/user', getUsers); //return all users (protected route)
router.get('/user/:id', getUsers);
router.put('/user/:id', updateUser); //update a user, not update password (protected route)
router.delete('/user/:id', deleteUser); //logical user deletion

/*Documents*/
router.post('/document', createDocument);
//router.get('/uploads/:name', downloadDocument);
router.get('/document/:entityId', getDocuments);
router.delete('/document/:documentId', deleteDocument)
router.get('/document/download/:documentId', downloadDocument)

/*Events*/
router.post('/event', createEvent);
router.put('/event/:id', multer.single('pdfFile'), updateEvent);
router.get('/event/:id', getEvent);
router.get('/event/', getEvents);
router.delete('/event/:id', deleteEvent)

/*Follows*/
router.post('/follow', createFollow);
router.get('/follow/', getFollows);
router.delete('/follow/:id', deleteFollow)

/*Business*/
router.post('/business', createBusiness); //adding a business
router.get('/business', getBusiness); //return all business
router.get('/business/:id', getBusiness); //return all business
router.put('/business/:id', updateBusiness); //update a business
router.delete('/business/:id', deleteBusiness); //delete a business

/*Projects*/
router.post('/project', createProjects); //adding a project
router.get('/project', getProjects); //return all projects
router.get('/project/:id', getProjects); //return all projects
router.put('/project/:id', updateProject); //update a project
router.delete('/project/:id', deleteProject); //delete a project

export {router as routes}
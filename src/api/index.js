import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

import batches from './batches.json';
import batchesSingle from './batches-single.json';
import files from './files.json';
import users from './users.json';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post( '/login', ( req, res ) => {
		// const response = { token: '123412341234' };
		const email = req.query['email'];
		const password = req.query['password'];

		// some email logic
		// generate token
		res.json( {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3NSwiY29tcGFueV9pZCI6NDg2LCJyb2xlcyI6WyJ1c2VyIiwic3Bpbm5lciJdLCJzdWIiOjc1LCJpc3MiOiJodHRwczovL2FwaS50cmFjZWFiaWxpdHkuYXVzdHJhbGlhbm1lcmluby5uZXQuYXUvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2NjA3NDE2ODIsImV4cCI6MTY2MDc0ODg4MiwibmJmIjoxNjYwNzQxNjgyLCJqdGkiOiJ4dndTVmg5TEZoM3dCbEtWIn0.rP-XZ-tZR5FiUS_rEIyLH_UAU1Xz6IcC62hWbOH6zt4"} );
	} );

	api.get( '/batches', ( req, res ) => {
		res.json( batches );
	} );

	api.get( '/batches/:batchId', ( req, res ) => {
		const key = req.params.batchId;
		if( batchesSingle[key] ) {
			res.json( batchesSingle[key] );	
		}
		else {
			res.status(404).json( {} );
		}
	} );

	api.get( '/files', ( req, res ) => {
		// const key = req.params.batchId;
		// if( batchesSingle[key] ) {
		res.json( files );	
		// }
		// else {
		// 	res.status(404).json( {} );
		// }
	} );

	api.get( '/users/:userId', ( req, res ) => {
		const key = req.params.userId;
		if( users[key] ) {
			res.json( users[key] );	
		}
		else {
			res.status(404).json( {} );
		}
	} );

	return api;
}

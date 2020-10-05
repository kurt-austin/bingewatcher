insert into users (userName,password,timeAvailable,createdAt,updatedAt) values ("lokiloki","idontlikethor",5.5,now(),now());
insert into users (userName,password,timeAvailable,createdAt,updatedAt) values ("supperman","testtest",1.0,now(),now());
insert into users (userName,password,timeAvailable,createdAt,updatedAt) values ("dinnerman","testtest",0.0,now(),now());
insert into users (userName,password,timeAvailable,createdAt,updatedAt) values ("hulkhulk","testtest",3.0,now(),now());


-- select * from users;

insert into tv_shows (name,description,image,runtime,numOfEpisodes,rating,genre,timeBudgeted,timeLogged,tvShowID,createdAt,updatedAt,UserId) 
values ("Lost","A waste of time.","https://static.episodate.com/images/tv-show/full/4228.jpg",60.0,120,2.5,"Mystery",1.5,27.5,4228,now(),now(),1);
insert into tv_shows (name,description,image,runtime,numOfEpisodes,rating,genre,timeBudgeted,timeLogged,tvShowID,createdAt,updatedAt,UserId) 
values ("The Flash","A fun time.","https://static.episodate.com/images/tv-show/full/35624.jpg",60.0,200,9.5,"Super Hero",2.0,45,35624,now(),now(),1);
insert into tv_shows (name,description,image,runtime,numOfEpisodes,rating,genre,timeBudgeted,timeLogged,tvShowID,createdAt,updatedAt,UserId) 
values ("The 100","Everything falls apart.","https://static.episodate.com/images/tv-show/full/33514.jpg",60.0,100,8.5,"Future",2.0,70,33514,now(),now(),1);
insert into tv_shows (name,description,image,runtime,numOfEpisodes,rating,genre,timeBudgeted,timeLogged,tvShowID,createdAt,updatedAt,UserId) 
values ("Supernatural","Lasted forever.","https://static.episodate.com/images/tv-show/full/33514.jpg",60.0,10,8.5,"Supernatural",2.0,10,33514,now(),now(),1);
insert into tv_shows (name,description,image,runtime,numOfEpisodes,rating,genre,timeBudgeted,timeLogged,tvShowID,createdAt,updatedAt,UserId) 
values ("Lost","A waste of time.","https://static.episodate.com/images/tv-show/full/4228.jpg",60.0,120,2.5,"Mystery",2.5,5,4228,now(),now(),2);

-- select * from tv_shows;
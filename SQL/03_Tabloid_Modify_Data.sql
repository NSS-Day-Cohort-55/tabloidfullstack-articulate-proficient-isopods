USE [Tabloid]
GO

set identity_insert [Reaction] on
insert into [Reaction] ([Id], [Name], [ImageLocation])
values (1,'Like','https://cdn-icons.flaticon.com/png/512/1062/premium/1062573.png?token=exp=1657813756~hmac=4584ab60406ce60023d61a5ec30e7ab8'),
(2,'Love','https://cdn-icons.flaticon.com/png/512/3065/premium/3065887.png?token=exp=1657813831~hmac=b97518d5a71841955169ce809b2d89df'),
(3,'Dislike','https://cdn-icons.flaticon.com/png/512/2665/premium/2665170.png?token=exp=1657813913~hmac=29ad941fd4bec489226397f3ed27e9cf'),
(4,'Hate','https://cdn-icons.flaticon.com/png/512/3587/premium/3587187.png?token=exp=1657814294~hmac=3ba86c2b4d040d623c49ff288fbc4507'),
(5,'Laugh','https://cdn-icons.flaticon.com/png/512/2283/premium/2283109.png?token=exp=1657814730~hmac=20dbd82a530139853def366b5e44f4f4'),
(6,'EyeRoll','https://cdn-icons.flaticon.com/png/512/3115/premium/3115722.png?token=exp=1657814857~hmac=e58ce6f51a418f668dc47039b2c1b745'),
(7,'Doody','https://cdn-icons-png.flaticon.com/512/7129/7129184.png')
set identity_insert [Reaction] off

set identity_insert [PostReaction] on
insert into [PostReaction] ([Id] , [PostId], [ReactionId] , [UserProfileId])
values (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,4,1),(5,1,5,1),(6,1,6,1),(7,1,7,1)
set identity_insert [PostReaction] off
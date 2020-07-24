import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish({dish}){
	if(dish==null){
		return(" ");
	}
	else
	{
		return(
			<Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
		);
	}
}


function RenderComments({comments})
{
	if(comments==null)
	{
		return(<div></div>);
	}
	else
	{
		let enterComments=comments.map((individual)=> {
			return(

					<li>
						<div>{individual.comment}</div><br/>
						<div>--{individual.author},{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(individual.date)))}</div><br/>
					</li>

				);
			});
		return(
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{enterComments}
				</ul>
			</div>
		);
	}
}

function Detail({dish}){

	let comment;
	if(dish!=null)
	{
		comment=dish.comments;
	}
	else
	{
		comment=null;
	}
	return(
		<div className="container">
			<div className="row">
				<div  className="col-12 col-md-5 m-1">
					<RenderDish dish={dish} />
				</div>
				<div  className="col-12 col-md-5 m-1">
					<RenderComments comments={comment} />
				</div>
			</div>
		</div>
	)
}



export default Detail;


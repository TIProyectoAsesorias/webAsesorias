import styled from "@emotion/styled"

export const Linke = styled.button`
position: flex;
width: 381px;
align-items: center;
height: 75px;
text-align: center;
display: center;
list-style: none;
margin-top: 0px;
margin-bottom: 20px;
margin-left: -40px;
padding: 10px 0;
box-shadow: 0px 5px 7px -4px #000000;
border-radius: 10px;
background: #FFFFFF;
border: 1px solid #707070B0 ;
&:hover {
  cursor: pointer;
  }

&:active {
  color: #006933;
  border-radius: 10px;
} 

&:hover { background:  #f6f6f6;
}

&:hover{
  transform: translateX(300px) skewX(-15deg)
  opacity: .6;
  transition: .7s;
  border-radius: 10px;
  }
`;

export const Espace = styled.div`
padding-top: 3rem;
`;

export const Li = styled.li`
list-style: none;
`;
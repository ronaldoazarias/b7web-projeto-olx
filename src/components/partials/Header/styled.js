import styled from 'styled-components';

export const HeaderArea = styled.div`
background-color: #FFF;
height:60px;
border-bottom: 1px solid #CCC;

.container {
    max-width: 1000px;
    margin: auto;
    display: flex;
}

.logo {
    flex: 1;
    display: flex;
    align-items: center;
    height:60px;

    .logo-1,
    .logo-2,
    .logo-3 {
        font-size: 27px;
        font-weight: bold;
    }

    .logo-1 { color: #F00; }
    .logo-2 { color: #0F0; }
    .logo-3 { color: #00F; }    

}

nav {
    padding-top:10px;
    padding-bottom:10px;

    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul {
        display: flex;
        align-items: center;
        height: 40px;
    }

    li {
        margin-left: 20px;
        margin-right: 20px;

        a, button {
            border: 0;
            background: none;
            cursor: pointer;
            outline: 0;
            font: 'Open Sans', sans-serif;
            color: #000;
            font-size: 14px;

            &:hover {
                color: #999;
            }

            &.button {
                background-color: #FF8100;
                border-radius: 4px;
                color:#FFF;
                padding: 5px 10px;                
            }

            &.button:hover {
                background-color: #E57706;
            }
        }
    }
}

@media (max-width: 600px) {
    & {
        height: auto;
    }

    .container {
        flex-direction: column;
    }

    .logo {
        justify-content: center;
        margin: 20px 0;
    }

    nav ul {
        flex-direction: column;
        height: auto;        
    }

    nav li {
        margin: 10px 20px;
    }
}
`;
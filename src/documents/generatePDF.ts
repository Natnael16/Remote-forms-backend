var generagePDf = ({ name, regNo, department, phone,id, image }) => {
    const today = new Date();
return `
    <!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>PDF Result Template</title>
    <style>
        
        .invoice-box {
            
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            max-width: 1100px;
            margin: 25px;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 15px;
            line-height: 24px;
            
            
        }
        .margin-top {
            margin-top: 50px;
        }

        .justify-center {
            text-align: center;
        }

        .inputs {
            font-size: 18px;
            margin: 6px 0;
            box-sizing: border-box;
            border: none;
            border-bottom: 2px solid black;
        }
        .image-container{
            width: 1000px ;
            height: 650px;
            border: 2px solid ;
            margin: 15px;
        }
        .image{
            width: 1000px;
            height: 650px;
        
    </style>
</head>

<body>
    <div class="">
    <section>
            <span style="margin-left: 5px; margin-right: 80px;">
        <label for="name">NAME </label>
         <input disabled type="text" name="name" class="inputs" value="${name}">
        </span>
        <span style="margin-left: 5px; margin-right: 80px;">
            <label for="reg">REG NO. </label>
            <input disabled type="text" name="reg" class="inputs" value="${regNo}">
        </span>
        <span style="margin-left: 5px; margin-right: 80px;">
            <label for="date">DATE </label>
            <input disabled type="text" name="date" class="inputs" value="${`${today.getDate()}. ${
              today.getMonth() + 1
            }. ${today.getFullYear()}.`}">
        </span>
    </section>
    <section>
        <span style="margin-left: 5px; margin-right: 20px;">
            <label for="dep">DEPARTMENT </label>
            <input disabled type="text" name="dep" class="inputs" value="${department}">
        </span>
        <span style="margin-left: 5px; margin-right: 40px;">
            <label for="phone">TELEPHONE NO. </label>
            <input disabled type="text" name="phone" class="inputs" value="${phone}">
        </span>
        <span style="margin-left: 5px; margin-right: 20px;">
            <label for="id">ID </label>
            <input disabled type="text" name="id" style="width: 15%;" class="inputs" value="${id}">
        </span>
    </section>
    <section>
        <div class="image-container">
            <img class="image" src="${image}" alt="The route for the house">

        </div>
    </section>
        
    </div>
</body>

</html>
    `;
};
export default generagePDf;
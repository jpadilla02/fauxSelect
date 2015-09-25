<?php include('header.php'); ?>
<form action="">
    <label for="testEl1">
        test label
    </label>
    <select name="tester" id="testEl1" placeholder="This is my test header">
        <option name="test" value="test">
            test option that is the longer option
        </option>
        <option name="test2" value="test2">
            test2
        </option>
        <option name="test3" value="test3">
            test the third
        </option>
        <option name="test4" value="test4">
            test the final
        </option>
    </select>
    <label for="testEl2">
        test label
    </label>
    <select name="tester" id="testEl2" placeholder="This is my test header">
        <option name="test" value="test">
            test2
        </option>
        <option name="test2" value="test2">
            test2222
        </option>
        <option name="test3" value="test3">
            test the third2
        </option>
    </select>
    <input type="submit">
</form>
<?php include('footer.php'); ?>

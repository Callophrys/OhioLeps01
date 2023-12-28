Function toJSON(PassTblQry)
' EXPORT JSON FILE FROM TABLE OR QUERY
Dim mydb As Database, rs As Recordset
Dim VarField(255), VarFieldType(255)
Dim fld As DAO.Field, VarDat As String
Set db = CurrentDb
fn = CurrentProject.Path & "\" & PassTblQry & " " & Format(Now(), "YYYY-MM-DD HHMM") & ".json" ' define export current folder query date/time
Open fn For Output As #1    ' output to text file
Recs = DCount("*", PassTblQry) ' record count
Set rs = db.OpenRecordset("Select * from [" & PassTblQry & "]")
Nonulls = True ' set NoNulls = true to remove all null values within output ELSE set to false
fieldcount = 0
' Save field count, fieldnames, and type into array
For Each fld In rs.Fields
    fieldcount = fieldcount + 1
    VarField(fieldcount) = fld.Name
    'Debug.Print VarField(fieldcount)
    VarFieldType(fieldcount) = "TEXT"
    Select Case fld.Type
        Case 4, 5, 6, 7 ' fieldtype 4=long, 5=Currency, 6=Single, 7-Double
            VarFieldType(fieldcount) = "NUMBER"
    End Select
Next
Set fld = Nothing
Print #1, "[" ' start JSON dataset
' build JSON dataset from table/query data passed
Do While Not rs.EOF
    Print #1, "{"  ' START JSON record
    ' build JSON record from table/query record using fieldname and type arrays
    For looper = 1 To fieldcount
        VarFT = VarFieldType(looper)
        If VarFT = "NUMBER" Then QuoteID = ""     ' No quote for numbers
        QuoteID = Chr(34) ' double quote for text
        If IsNull(rs(VarField(looper)).Value) Then  ' deal with null values
            VarDat = "Null": QuoteID = ""   ' no quote for nulls
            If Nonulls = True Then VarDat = "": QuoteID = Chr(34)                       ' null text to empty quotes
            If Nonulls = True And VarFT = "NUMBER" Then VarDat = "0": QuoteID = ""      ' null number to zero without quotes
            Else
            VarDat = Trim(rs(VarField(looper)).Value)
        End If
        VarDat = Replace(VarDat, Chr(34), "'") ' replace double quote with single quote
        VarDat = Replace(VarDat, Chr(8), "")   ' remove backspace
        VarDat = Replace(VarDat, Chr(10), "")  ' remove line feed
        VarDat = Replace(VarDat, Chr(12), "")  ' remove form feed
        VarDat = Replace(VarDat, Chr(13), "")  ' remove carriage return
        VarDat = Replace(VarDat, Chr(9), "   ")  ' replace tab with spaces
        jsonRow = Chr(34) & VarField(looper) & Chr(34) & ":" & QuoteID & VarDat & QuoteID
        If looper < fieldcount Then jsonRow = jsonRow & "," ' add comma if not last field
        Print #1, Chr(9) & jsonRow
    Next looper
    Print #1, "}";  ' END JSON record
rs.MoveNext
If Not rs.EOF Then
    Print #1, "," ' add comma if not last record
    Else
    Print #1, ""
End If
Loop
Print #1, "]"  ' close JSON dataset
Close #1

End Function
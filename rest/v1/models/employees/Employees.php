<?php
class Employees{
    public $employee_aid;
    public $employee_is_active;
    public $employee_first_name;
    public $employee_middle_name;
    public $employee_last_name;
    public $employee_email;
    public $employee_created;
    public $employee_updated;
    
    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblEmployee;

    public function __construct($db){
        $this->connection = $db;
        $this->tblEmployee ="employees"; 
    }

    public function create(){
        try{
            $sql = "insert into {$this->tblEmployee} ";
            $sql .=" ( ";
            $sql .=" employee_is_active, ";
            $sql .=" employee_name, ";
            $sql .=" employee_email, ";
            $sql .=" employee_created, ";
            $sql .=" employee_updated "; 
            $sql .=" ) values ( ";
            $sql .=" :employee_is_active, ";
            $sql .=" :employee_name, ";
            $sql .=" :employee_email, ";
            $sql .=" :employee_created, ";
            $sql .=" :employee_updated ";
            $sql .=" ) ";
            $query =$this->connection->prepare($sql);
            $query->execute([
                "employee_is_active"=> $this->employee_is_active,
                "employee_name"=> $this->employee_name,
                "employee_email"=> $this->employee_email,
                "employee_created"=> $this->employee_created,
                "employee_updated"=> $this->employee_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function readAll(){
        try{
            $sql = " select ";
            $sql .= " * ";
            $sql .= " from {$this->tblEmployee} ";
            $sql .= " where true ";
            $sql .= $this->employee_is_active 
            ? " and employee_is_active = :employee_is_active " 
            : "tite";
            $sql .= $this->search !== "" ? "and ( ":" ";
            $sql .= $this->search !== "" ? " employee_first_name like :employee_first_name ":" ";
            $sql .= $this->search !== "" ? " or employee_middle_name like :employee_middle_name ":" ";
            $sql .= $this->search !== "" ? " or employee_last_name like :employee_last_name ":" ";
            $sql .= $this->search !== "" ? " or employee_email like :employee_email ":" ";
            $sql .= $this->search !== "" ? " ) ":" ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                ...$this->employee_is_active ?["employee_is_active"=>$this->employee_is_active]:[],
                ...$this->search ?[
                    "employee_first_name"=>"%($this->search)%",
                    "employee_middle_name"=>"%($this->search)%",
                    "employee_last_name"=>"%($this->search)%"
                    "employee_email"=>"%($this->search)%",
                ]:[],
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

public function update(){
    try {
        $sql = "UPDATE {$this->tblEmployee} SET ";
        $sql .= "employee_name = :employee_name, ";
        $sql .= "employee_email = :employee_email, ";
        $sql .= "employee_updated = :employee_updated ";
        $sql .= "WHERE employee_aid = :employee_aid";

        $query = $this->connection->prepare($sql);
        $query->execute([
            "employee_name" => $this->employee_name,
            "employee_email" => $this->employee_email,
            "employee_updated" => $this->employee_updated,
            "employee_aid" => $this->employee_aid,
        ]);
    } catch(PDOException $e){
        $query = false;
    }
    return $query;
}

public function active(){
    try {
        $sql = "UPDATE {$this->tblEmployee} SET ";
        $sql .= "employee_is_active = :employee_is_active, ";
        $sql .= "employee_updated = :employee_updated ";
        $sql .= "WHERE employee_aid = :employee_aid";

        $query = $this->connection->prepare($sql);
        $query->execute([
            "employee_is_active" => $this->employee_is_active,
            "employee_updated" => $this->employee_updated,
            "employee_aid" => $this->employee_aid,
        ]);
    } catch(PDOException $e){
        // returnError($e) // for debugging
        $query = false;
    }
    return $query;
}


    public function delete(){
    try {
        $sql = "DELETE FROM {$this->tblEmployee} ";
        $sql .= "WHERE employee_aid = :employee_aid";

        $query = $this->connection->prepare($sql);
        $query->execute([
            "employee_aid" => $this->employee_aid,
        ]);
    } catch(PDOException $e){
        // returnError($e) // for debugging
        $query = false;
    }
    return $query;
}
      public function checkName(){
        try{
            $sql = " select ";
            $sql .= " employee_name ";
            $sql .= " from {$this->tblEmployee} ";
            $sql .= " where employee_name = :employee_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_name" => $this->employee_name,
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }  

}
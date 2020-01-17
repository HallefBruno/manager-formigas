
package com.manager.repository;

import com.manager.entity.Email;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmailRepository extends JpaRepository<Email, Long>{
    Optional<Email> findByEmail(String email);
}

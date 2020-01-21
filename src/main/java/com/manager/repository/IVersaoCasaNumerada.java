
package com.manager.repository;

import com.manager.entity.VersaoCasaNumerada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVersaoCasaNumerada extends JpaRepository<VersaoCasaNumerada, Long> {
    
}

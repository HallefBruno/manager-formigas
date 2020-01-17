
package com.manager.repository;

import com.manager.entity.CodigoVerificacao;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICodigoVerificacaoRepository extends JpaRepository<CodigoVerificacao, Long>{
    Optional<CodigoVerificacao> findByNumeroGerado(Long codigo);
    CodigoVerificacao findTopByOrderByIdDesc();
}

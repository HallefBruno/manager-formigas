
package com.manager.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "versao_casa_numerada")
public class VersaoCasaNumerada implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "quantidade_casas")
    private Integer quantidadeCasas;
    
    @Column(name = "inicia_numero")
    private Integer iniciaNumero;
    
    @JoinColumn(name = "id_codigo_validacao")
    @OneToOne(fetch = FetchType.LAZY)
    private CodigoVerificacao codigoVerificacao;
    
    @Column(name = "senha_provisoria")
    private String senhaProvisoria;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantidadeCasas() {
        return quantidadeCasas;
    }

    public void setQuantidadeCasas(Integer quantidadeCasas) {
        this.quantidadeCasas = quantidadeCasas;
    }

    public Integer getIniciaNumero() {
        return iniciaNumero;
    }

    public void setIniciaNumero(Integer iniciaNumero) {
        this.iniciaNumero = iniciaNumero;
    }

    public CodigoVerificacao getCodigoVerificacao() {
        return codigoVerificacao;
    }

    public void setCodigoVerificacao(CodigoVerificacao codigoVerificacao) {
        this.codigoVerificacao = codigoVerificacao;
    }

    public String getSenhaProvisoria() {
        return senhaProvisoria;
    }

    public void setSenhaProvisoria(String senhaProvisoria) {
        this.senhaProvisoria = senhaProvisoria;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final VersaoCasaNumerada other = (VersaoCasaNumerada) obj;
        return Objects.equals(this.id, other.id);
    }

}
